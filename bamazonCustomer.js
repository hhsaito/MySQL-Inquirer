var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'bamazon_db'
});

connection.connect(function(err){
	if (err) throw err;
	console.log('Connected as id: ' + connection.threadId);
	start();
});

var start = function(){
	console.log('Welcome to Bamazon!');
	console.log('Here is our current inventory.');
	new Promise(function () {
		return searchAll();
	}).then(function() {
		console.log('hello');
	}).catch(function(err) {
		console.log(err);
	});
}

var searchAll = function() {
	connection.query('SELECT * FROM bamazon_db.products', function(err, res){
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log('ID#: ' + res[i].item_id + ' "' + res[i].product_name + '" Price: ' + res[i].price);
		}
	});
}

var makePurchase = function() {
	
}