const fs = require('fs');
const path = require('path');
const logipHoraMiddleware = (req, res, next) =>{
    let linha = `${req.ip} | ${new Date().toISOString()} | ${req.url} \n`

    fs.appendFileSync(path.join(__dirname,"../logs/log.txt"), linha)
    next();
}


module.exports = logipHoraMiddleware;