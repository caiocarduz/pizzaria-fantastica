const path = require('path');
const usuarios = require('../database/Usuarios.json');
let auth = require('../middlewares/auth')
let bcrypt = require('bcrypt');
const fs = require('fs');
const User = require('../database/User')
const passport = require("passport");
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = {
	showLogin: (req, res)=>{
		res.render("admin/login")
	},
    // logar: (req, res) =>{
    //     let usuario = usuarios.find(usuario => usuario.email == req.body.email)
    //     req.session.usuario_logado = usuario
    //     console.log(usuario)                                                   
    //     if (typeof(usuario) === "undefined"){
    //         res.redirect("/admin/login?error=1")
    //     }
    //     if (!bcrypt.compareSync(req.body.senha, usuario.senha)){
    //         res.redirect("/admin/login?error=1")
    //     }
    //     else{
    //        res.redirect("/user")
    //     }
    // },
    // user: (req, res) =>{
    //     res.render('user', {user_logado: req.session.usuario_logado })
    // },
    createUser: (req, res) =>{
        res.render('createuser')
    },
    saveForm: (req, res) =>{
        let {nome,email, senha} = req.body;
        senhaC = bcrypt.hashSync(senha, 10)
        let usuarioNovo ={
            'nome': nome,
            'email':email,
            'senha':senhaC
        }

        fs.readFile(path.join(__dirname,"../database/Usuarios.json"), function (err, data) {
            var json = JSON.parse(data)
            json.push(usuarioNovo)

            fs.writeFileSync(path.join(__dirname,"../database/Usuarios.json"), JSON.stringify(json))
        })
        res.send('usuario cadastrado')

    },
    registerPage: (req, res) =>{
        res.render('createuserpassport')

    },
    userPassport: (req,res) =>{ 
        User.findById(req.user.id, function(err, foundUsers){
            if (err){
              console.log(err);
            } else {
              if (foundUsers) {
                //   foundUsers._id = foundUsers._id.toHexString();
                console.log(req.user.id)
                res.render('userpassport', {userpassport: foundUsers.username});
              }
            }
          });
    },
    saveFormPassport: (req, res) =>{
       User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
          console.log(err);
          res.redirect("/crateuserpassport");
        } else {
          passport.authenticate("local")(req, res, function(){
            console.log(req.user.id)
            const userId = req.session.passport.user
            res.redirect('/userpassport')
          });
        }
      });
    },
    logout: (req, res) => {
      req.logout();
      res.send(req.user);
    }
}