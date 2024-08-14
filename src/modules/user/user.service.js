const autoBind = require("auto-bind")
const createHttpError = require("http-errors")
const UserModel = require("./user.model")

class UserService{
    #model
    constructor(){
        autoBind(this)
        this.#model = UserModel
    }
    async updateUserProfile(userId, updateData) {
        const user = await this.#model.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) throw new createHttpError.NotFound('User not found');
        return user;
    }



}
module.exports = new UserService()