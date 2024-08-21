const createHttpError = require("http-errors")
const { AuthorizationMessage } = require("../messages/auth.message")
const UserModel = require("../../modules/user/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Authorization = async(req, res, next)=>{
    try {
        const token = req?.cookies?.accessToken
        if(!token) throw new createHttpError.Unauthorized(AuthorizationMessage.Login)
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)  
        if(typeof data === "object" && "id" in data){
            const user = await UserModel.findById(data.id, {accessToken: 0, otp:0, verifiedMobile:0, __v:0, updatedAt:0})
            if(!user) throw new createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount)
            req.user = user    
            return next()
        }
        throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken)
        
    } catch (error) {
        next(error)
        
    }


}
module.exports = {
    Authorization
}