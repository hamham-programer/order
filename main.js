const express = require("express")
const SwaggerConfig = require("./src/config/swagger.config")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv").config()
async function main() {
    const port = process.env.PORT
    const app = express()
    require("./src/config/mongoose.config")
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    SwaggerConfig(app)
    



    app.listen(port, ()=>{
        console.log(`http://localhost:${port}`);
        
    })

    
}
main()