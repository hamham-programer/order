const { Router } = require("express");
const router = Router();
const questionController = require("./question.controller");

// ایجاد سوال جدید
router.post("/create", questionController.create);

// دریافت سوالات یک نظرسنجی
router.get("/surveys/:surveyId/questions", questionController.getQuestionsBySurvey);

// دریافت سوال خاص
router.get("/:id", questionController.getQuestionById);

// ویرایش سوال
router.put("/:id", questionController.updateQuestion);

// حذف سوال
router.delete("/:id", questionController.deleteQuestion);


module.exports = {
    QuestionRoutes: router
}
