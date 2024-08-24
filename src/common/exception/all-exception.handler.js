function AllExceptionHandler(app){
    app.use((err, req, res, next) =>{
        let status = err?.status ?? err?.statusCode 
        if(!status || isNaN(+status) || status> 511 || status<200)  status=500
        res.status(status).json({
            message: err?.message ?? err?.stack ?? "internalServerError"
        })
    })
}
module.exports = {
    AllExceptionHandler
}