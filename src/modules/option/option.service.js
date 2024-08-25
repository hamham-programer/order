const autoBind = require("auto-bind")
const { OptionMessage } = require("./option.message")
const HttpCodes = require("http-codes")
const { OptionModel } = require("./option.model")
const categoryService = require("../category/category.service")
const createHttpError = require("http-errors")
const { default: slugify } = require("slugify")
const { isTrue, isFalse } = require("../../common/utils/function")
class OptionService{
    #model
    #ctegoryService
    constructor(){
        autoBind(this)
        this.#model = OptionModel
        this.#ctegoryService = categoryService

    }
    async create(optionDto){
            const category = await this.#ctegoryService.checkExistById(optionDto.category)
            optionDto.category = category._id  
            optionDto.key = slugify(optionDto.key, {trim:true, replacement: "_", lower:true})  
            await this.alreadyExistByCategoryAndKey(optionDto.key, category._id)
            if(optionDto?.enum && typeof optionDto.enum === "string"){
                optionDto.enum = optionDto.enum.split(",")
            }else if (!Array.isArray(optionDto.enum)) optionDto.enum = []
            if(isTrue(optionDto?.required)) optionDto.enum = true
            if(isFalse(optionDto?.required)) optionDto.enum = true
            const option = await this.#model.create(optionDto)
            return option           

    }
    async update(){
 

    }
    async findByCategoryId(category){
        return await this.#model.find({category}, {__v:0}).populate([{path: "category", select: {name: 1, slug: 1}}])

    
    }
    async findById (id){
        return await this.checkExistById(id)
    
    }
    async removeById(){
      
    }
    async findByCategorySlug(slug){
        const options = await this.#model.aggregate([
            {
                $lookup:{
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $project:{
                    category: 0,
                    __v: 0
                }
            },
            {
                $addFields:{
                    categorySlug: "category.slug",
                    categoryName: "$categoryName",
                    categoryIcon: "$category.icon"
                }
            },
            {
                $match:{
                    categorySlug: slug
                }
            }
        ])
        return options
      
    }
    async find(){
        const options = await this.#model.find({}, {__v: 0}, {sort:{_id:-1}}).populate
        ([{path:"category", select: {name: 1, slug: 1}}])
        return options
    }

    async checkExistById(id){
        const option = await this.#model.findById(id)
        if(!option) throw new createHttpError.NotFound(OptionMessage.NotFound)
        return option
    }
    async alreadyExistByCategoryAndKey(key, category){
        const isExist = await this.#model.findOne({category, key})
        if(isExist)throw new createHttpError.Conflict(OptionMessage.AlreadExist)
        return null
    }



}
module.exports = new OptionService()