const pizzas = require('../database/Pizzas.json');
var fs = require('fs');
const path = require('path');
module.exports = {
	index: (req, res)=>{
		res.render("index", {pizzas: pizzas, busca: ""});
	},
	show: (req, res) =>{ 


		let pizza = pizzas.find(
			pizza => pizza.id == req.params.id
		);
		// Capturando a posição da pizza no array
		let pos = pizzas.indexOf(pizza);

		// determinando o id da próxima pizza e da anterior
		let idPrev = null;
		let idNext = null;

		if (pos > 0) {
			idPrev = pizzas[pos - 1].id;
		}

		if (pos < pizzas.length - 1) {
			idNext = pizzas[pos + 1].id;
		}

		// if (pizza) {
			res.render("pizza", {pizza, idPrev, idNext});
		// } else {
		// 	res.sen("erro");
		// }
		
	},

	search: (req, res) => {
		const busca = req.query.q
		let filteredpizzas = pizzas.filter(
			filteredpizzas => filteredpizzas.nome.toLocaleUpperCase().includes(busca.toLocaleUpperCase()));
		if (busca){
			res.render("index", {pizzas: filteredpizzas, busca})
		}	
		else{
			res.redirect("/")
		}
	},

	create: (req, res) => {
		res.render("pizza-create", {pizzas: pizzas})
	},

	store: (req, res) => {
		const nome = req.body.nome;
		const preco = req.body.preco;
		const ingredientes = req.body.ing
		const imagem = req.file.path

		let pizza ={
			id: pizzas[pizzas.length -1].id + 1, 
			nome: nome, 
			ingredientes: ingredientes.split(","), 
			preco: preco, 
			img: imagem.slice(6), 
			destaque: true}

		
		pizzas.push(pizza)
		fs.writeFileSync(path.join('database', 'Pizzas.json'), JSON.stringify(pizzas))
		console.log(req.file)
		res.redirect('/')
	}
}