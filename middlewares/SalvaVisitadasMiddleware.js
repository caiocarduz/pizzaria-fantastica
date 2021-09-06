module.exports = (req,res,next) =>{
    console.log(req.params.id);
    res.cookie('visitadas', req.params.id)
    next();
};