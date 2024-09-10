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
            const { surveyId, answers } = req.body;
            const userId = req.user._id;
            const survey = await SurveyModel.findById(surveyId);
            if (!survey) throw createHttpError.NotFound("Survey not found");
            let formattedAnswers;
                try {
                    formattedAnswers = JSON.parse(answers);
                } catch (error) {
                       throw createHttpError.BadRequest("Invalid JSON format for answers");
                }
            const response = await ResponseModel.create({
                surveyId,
                userId,
                answers:formattedAnswers
            });

            res.json({ message: "Response submitted successfully", response });
        } catch (error) {
            next(error);
        }
    }

    async getResponses(req, res, next) {
        try {
            const { surveyId } = req.query;
            const responses = await ResponseModel.find({ surveyId }).populate("user");
            res.json({ responses });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ResponseController();
