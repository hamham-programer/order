const { Schema, Types, model } = require("mongoose");

const ResponseSchema = new Schema(
  {
    surveyId: { type: Types.ObjectId, ref: "Survey", required: true }, // لینک به نظرسنجی
    userId: { type: Types.ObjectId, ref: "User", required: true }, // لینک به کاربر
    answers: [
      {
        questionId: { type: Types.ObjectId, ref: "Question", required: true }, // لینک به سوال
        answer: { type: Schema.Types.Mixed, required: true }, // پاسخ به سوال (می‌تواند رشته، عدد، یا گزینه انتخابی باشد)
        answerType: { type: String, enum: ['multiple-choice', 'text'], required: true }, // نوع پاسخ

      },
    ],
  },
  {
    timestamps: true,
  }
);

const ResponseModel = model("Response", ResponseSchema);
module.exports = ResponseModel;
