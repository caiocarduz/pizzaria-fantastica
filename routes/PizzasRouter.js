var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
const multer  = require('multer')
const path = require('path');
var salvaVisitadasMiddleware = require('../middlewares/SalvaVisitadasMiddleware.js')
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + uniqid() + path.extname(file.originalname))
    }
    
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter (req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('upload a image'))

        }
        cb(undefined, true)

    }
    })
const PizzasController = require('../controllers/PizzasController');

/* GET home page. */
router.get('/', PizzasController.index);
router.get('/pizzas/:id', salvaVisitadasMiddleware, PizzasController.show);
router.get('/busca', PizzasController.search)
router.get('/create', PizzasController.create);
router.post('/create', upload.single('img'), PizzasController.store )
router.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
}, (error, req, res, next) =>{
    res.status(400).send({error: error.message})
}
)


module.exports = router;
