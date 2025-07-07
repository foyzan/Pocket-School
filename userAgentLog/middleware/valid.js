const {saveUserAgent} = require("../utils/logger");


function isValid(req, res, next){
    const token = req.query.token;

    if(token === '123')
    {
        next();
    }else{
        res.json('invalid request')
    }
}


function checkUserAgent ( req, res, next) {
    
    const userAgent = req.headers['user-agent'];
    if(userAgent){
        saveUserAgent(userAgent)
        next()
    }else{
        return res.json("User Agent missing")
    }
}
module.exports = {
    isValid,
    checkUserAgent
}