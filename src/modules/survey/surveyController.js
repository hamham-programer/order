const autoBind = require("auto-bind");
const SurveyModel = require("./survey.model");
const QuestionModel = require("./question.model");
const createHttpError = require("http-errors");

class SurveyController {
    constructor() {
        autoBind(this);
    }

    async create(req, res, next) {
        try {
            const { title, description, questions } = req.body;
            const userId = req.user._id;
            const createdSurvey = await SurveyModel.create({
                title,
                description,
                questions,
                createdBy: userId
            });
            res.json({ message: "Survey created successfully", survey: createdSurvey });
        } catch (error) {
            next(error);
        }
    }

    async getSurveys(req, res, next) {
        try {
            const surveys = await SurveyModel.find();
            res.json({ surveys });
        } catch (error) {
            next(error);
        }
    }

    async getSurvey(req, res, next) {
        try {
            const { id } = req.params;
            const survey = await SurveyModel.findById(id).populate("questions");
            if (!survey) throw createHttpError.NotFound("Survey not found");
            res.json({ survey });
        } catch (error) {
            next(error);
        }
    }

    async deleteSurvey(req, res, next) {
        try {
            const { id } = req.params;
            await SurveyModel.findByIdAndDelete(id);
            res.json({ message: "Survey deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SurveyController();
