const auth = (req,res,next) =>{
   if (typeof(req.session.usuario_logado) != "undefined"){
       next();
   } else{
       res.send("voce precisa logar para acessar");
   }
};

module.exports = auth;