const autoBind = require("auto-bind");
const SurveyModel = require("./survey.model");
const createHttpError = require("http-errors");
const ResponseModel = require("./Response.model");

class ResponseController {
    constructor() {
        autoBind(this);
    }

    async submitResponse(req, res, next) {
        try {
            const { surveyId, answers, textResponses } = req.body;
            const userId = req.user._id;
            console.log('User ID:', userId);
            console.log('Survey ID:', surveyId);
            console.log('Answers:', answers);

            // بررسی وجود پاسخ قبلی برای همان کاربر و نظرسنجی
            const existingResponse = await ResponseModel.findOne({ surveyId, userId });
            if (existingResponse) {
                // اگر پاسخ قبلی وجود دارد، پیغام خطا ارسال شود
                return res.status(400).json({ message: "شما قبلا به این نظرسنجی پاسخ داده‌اید." });
            }
            
            const survey = await SurveyModel.findById(surveyId);
            if (!survey) throw createHttpError.NotFound("Survey not found");
            let formattedAnswers;
                try {
                    formattedAnswers = JSON.parse(answers);
                } catch (error) {
                       throw createHttpError.BadRequest("Invalid JSON format for answers");
                }
                 // بررسی اینکه آیا پاسخ‌ها با سوالات نظرسنجی مرتبط هستند
            const questionIds = survey.questions.map(q => q.toString());
             if (!formattedAnswers.every(answer => questionIds.includes(answer.questionId))) {
                 throw createHttpError.BadRequest("Some answers do not match survey questions");
             }    
            const response = await ResponseModel.create({
                surveyId,
                userId,
                answers:formattedAnswers,
            });
            console.log(response)
            res.json({ message: "Response submitted successfully", response });
        } catch (error) {
            next(error);
        }
    }

    async getResponses(req, res, next) {
        try {
            const { surveyId } = req.query;
            const responses = await ResponseModel.find({ surveyId }).populate("user") .populate('answers.questionId');
           
            res.json({ responses });
        } catch (error) {
            next(error);
        }
    }

    async getSurveyAnalysis(req, res, next) {
        try {
            const { surveyId } = req.params;

            // دریافت پاسخ‌ها برای نظرسنجی
            const responses = await ResponseModel.find({ surveyId }).populate('answers.questionId');
            
            // تعداد کل شرکت‌کنندگان
            const totalParticipants = responses.length;

            // استخراج اطلاعات سوالات نظرسنجی
            const survey = await SurveyModel.findById(surveyId).populate('questions');
            if (!survey) throw createHttpError.NotFound("Survey not found");

            // تجزیه و تحلیل پاسخ‌ها برای هر سوال
            const analysis = survey.questions.map(question => {
                // تعداد کل پاسخ‌ها به این سوال
                const totalResponses = responses.filter(response => response.answers.some(answer => answer.questionId.equals(question._id)));

                // شمارش تعداد پاسخ‌ها برای هر گزینه
                const optionCounts = {};
                question.options.forEach(option => {
                    optionCounts[option] = 0;
                });

                totalResponses.forEach(response => {
                    const answer = response.answers.find(a => a.questionId.equals(question._id));
                    if (answer && optionCounts[answer.answer] !== undefined) {
                        optionCounts[answer.answer]++;
                    }
                });

                // محاسبه درصد پاسخ‌ها برای هر گزینه
                const optionPercentages = {};
                Object.keys(optionCounts).forEach(option => {
                    optionPercentages[option] = (optionCounts[option] / totalParticipants) * 100;
                });

                return {
                    questionText: question.text,
                    options: question.options,
                    optionCounts,
                    optionPercentages
                };
            });

            // بازگشت اطلاعات تحلیل‌شده
            res.json({ totalParticipants, analysis });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ResponseController();
