const { Schema, Types, model } = require("mongoose");

const SurveySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    user: { type: Types.ObjectId, ref: "User" },
    questions: [{ type: Types.ObjectId, ref: "Question" }], // لینک به سوالات نظرسنجی
  },
  {
    timestamps: true,
  }
);

const SurveyModel = model("Survey", SurveySchema);
module.exports = SurveyModel;
