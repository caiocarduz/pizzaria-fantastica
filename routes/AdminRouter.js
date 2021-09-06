var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
const multer  = require('multer')
const path = require('path');
const { Router } = require('express');
var AdminController = require("../controllers/AdminController")
let auth = require('../middlewares/auth')

router.get('/admin/login', AdminController.showLogin);
// router.post('/admin/login', AdminController.logar);
// router.get('/user',  AdminController.user);
router.get('/createuser', AdminController.createUser);
router.post('/createuser', AdminController.saveForm)
// router.post('/admin/loginPassport', AdminController.registerPassport);
router.get('/createuserPassport', AdminController.registerPage);
router.get('/userpassport',  AdminController.userPassport);
router.post('/createuserPassport', AdminController.saveFormPassport);
router.get('/logout', AdminController.logout);

module.exports = router;