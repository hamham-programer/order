const autoBind = require("auto-bind")
const authService = require("./auth.service")
const AuthMessage = require("./auth.message")
const CookieNames = require("../../common/constant/cookie.enum")
const NodeEnv = require("../../common/constant/env.enum")
class AuthController{
    #service
    constructor(){
        autoBind(this)
        this.#service = authService
    }

    async sendOTP(req, res, next) {
        try {
            const {mobile} = req.body            
             await this.#service.sendOTP(mobile)
            return res.json({
                message: AuthMessage.SendOtoSuccessfully
            })
        } catch (error) {
            next(error)
            
        }
    }
    async checkOTP(req, res, next) {
        try {
            const {mobile, code} = req.body
            const token = await this.#service.checkOTP(mobile, code)
            return res.cookie(CookieNames.AccessToken, token, {
                httpOnly: true,
                secure: process.env.Node_Env === NodeEnv.Production
            }).status(200).json({
                message: AuthMessage.LoginSuccessfully,
                token
            })
            
        } catch (error) {
            next(error)
            
        }
    }
    async logOut(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
            
        }
    }
}
module.exports = new AuthController()