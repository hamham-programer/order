const {Router} = require("express")
const authController = require("./auth.controller")
const router = Router()
router.post("/send-otp", authController.sendOTP)
router.post("/check-otp", authController.checkOTP)
router.post("/check-refresh-token", authController.checkRefreshToken);
router.get("/logout", authController.logOut)


module.exports = {
    AuthRouter: router
}