const { Schema, Types, model } = require("mongoose");

const QuestionSchema = new Schema(
  {
    text: { type: String, required: true },
    surveyId: { type: Types.ObjectId, ref: "Survey", required: true }, // لینک به نظرسنجی
    type: { type: String, enum: ['multiple-choice', 'text'], required: true }, // نوع سوال
    options: [{ type: String }], // گزینه‌ها برای سوالات چندگزینه‌ای
  },
  {
    timestamps: true,
  }
);

const QuestionModel = model("Question", QuestionSchema);
module.exports = QuestionModel;
