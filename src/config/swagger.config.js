const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
function SwaggerConfig(app){
    const swaggerDocument= swaggerJsDoc({
        swaggerDefinition:{
            opeanapi:"3.0.1",
            info:{
                title: "order",
                description: "Developed by Hamidreza Shafiei",
                version: "1.0.0"
            }
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"]
    })
    const swagger =swaggerUi.setup(swaggerDocument,{})
    app.use("/swagger", swaggerUi.serve, swagger)
  
}
module.exports = SwaggerConfig