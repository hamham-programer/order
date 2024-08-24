const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema({
    category: {type:Types.ObjectId, ref: "Category", required: true},
    province: {type: String, required:false},
    city: {type: String, required:false},
    district: {type: String, required:false},
    address: {type: String, required:false},
    coordinate: {type: String, required:false},
    images: {type:[String], required:false, default:[]},
    options: {type: Object, required:false, default:{}}
},{timestamps: true})
const PostModel = model("post", PostSchema)
module.exports = {
    PostModel
}