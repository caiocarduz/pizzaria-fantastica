const pizzas = require('../database/Pizzas.json');

module.exports = {
	index: (req, res)=>{
		res.render("index", {pizzas: pizzas});
	},
	show: (req, res) =>{
		res.render("pizza", {pizzas: pizzas.find(pizza => pizzas.id == req.params.id)})
	}
}