const { Router } = require("express");
const ResponseController = require("./response.controller");
const { Authorization } = require("../../common/guard/authorization.guard");

const router = Router();

router.post("/submit", Authorization, ResponseController.submitResponse);
router.get("/", ResponseController.getResponses);

module.exports = {
    ResponseRoutes: router
}
