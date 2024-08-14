const {Routes, Router} = require("express")
const userController = require("./user.controller")
const router = Router()

router.get("/whoami", userController.whoami)
router.put("/profile", userController.updateProfile);

module.exports = {
    UserRouter: router
}