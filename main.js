const express = require("express")
const SwaggerConfig = require("./src/config/swagger.config")
const cookieParser = require("cookie-parser")
const mainRouter = require("./src/app.routes")
const { NotFoundHandler } = require("./src/common/exception/not-found.handler")
const { AllExceptionHandler } = require("./src/common/exception/all-exception.handler")
const dotenv = require("dotenv").config()
const cors = require("cors")
async function main() {
    const port = process.env.PORT || 5931
    const app = express()
    require("./src/config/mongoose.config")
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    app.use(cors({
        origin: ['http://localhost:5173', "https://panel.kavenegar.com", "https://nex-codes.ir","http://nex-codes.ir"],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],
        credentials: true // اجازه ارسال کوکی‌ها
    }));
   /*  app.options('*', cors({
        origin: ['http://localhost:5173', 'https://panel.kavenegar.com'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],
        credentials: true
    })); */
    
    app.use('/upload', express.static('public/upload'));

    SwaggerConfig(app) 
    app.use(mainRouter)
    AllExceptionHandler(app)
    NotFoundHandler(app)
    app.listen(port, ()=>{
        console.log(`https://api.nex-codes.ir:${port}`);
        
    })

    
}
main()