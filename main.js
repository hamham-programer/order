const express = require("express")
const SwaggerConfig = require("./src/config/swagger.config")
const cookieParser = require("cookie-parser")
const mainRouter = require("./src/app.routes")
const { NotFoundHandler } = require("./src/common/exception/not-found.handler")
const { AllExceptionHandler } = require("./src/common/exception/all-exception.handler")
const dotenv = require("dotenv").config()
async function main() {
    const port = process.env.PORT
    const app = express()
    require("./src/config/mongoose.config")
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    SwaggerConfig(app)
    app.use(mainRouter)
    AllExceptionHandler(app)
    NotFoundHandler(app)
    app.listen(port, ()=>{
        console.log(`http://localhost:${port}`);
        
    })

    
}
main()