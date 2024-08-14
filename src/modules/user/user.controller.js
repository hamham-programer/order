const autoBind = require("auto-bind")
const userService = require("./user.service")
class UserController{
    #service
    constructor(){
        autoBind(this)
        this.#service = userService
    }
    

    async whoami(req, res, next) {
        try {
            const user = req.user
            return res.json(user)
            
        } catch (error) {
            next(error)
            
        }
    }
    async updateProfile(req, res, next) {
        try {
            const userId = req.user._id;
            const { fullName, personnelCode, workLocation } = req.body;
    
            const user = await this.#service.updateUserProfile(userId, { fullName, personnelCode, workLocation });
            
            return res.status(200).json({
                message: 'Profile updated successfully',
                user
            });
        } catch (error) {
            next(error);
        }

}

    

}
module.exports = new UserController()