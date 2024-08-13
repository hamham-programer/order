const express = require("express")
const SwaggerConfig = require("./src/config/swagger.config")
const dotenv = require("dotenv").config()
async function main() {
    const port = process.env.PORT
    const app = express()
    require("./src/config/mongoose.config")
    SwaggerConfig(app)
    



    app.listen(port, ()=>{
        console.log(`http://localhost:${port}`);
        
    })

    
}
main()