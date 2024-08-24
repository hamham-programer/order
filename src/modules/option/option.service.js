const autoBind = require("auto-bind")
const { CategoryMessage } = require("./category.message")
const HttpCodes = require("http-codes")
const { OptionModel } = require("./option.model")
class OptionService{
    #model
    constructor(){
        autoBind(this)
        this.#model = OptionModel

    }


}
module.exports = new OptionService()