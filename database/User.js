const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema ({
    nome: String,
    email: String,
    password: String,
    googleId: String,
    facebookId: String,
    secret: [String]
  });

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

  module.exports = User = new mongoose.model("User", userSchema);