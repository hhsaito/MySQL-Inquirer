var mysql = require('mysql');
var inquirer = require('inquirer');
// mysql connection variables
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazon_db'
});

connection.connect(function(err) {
  // if connection error
  if (err) throw err;
  // show connection id and start
  // console.log('Connected as id: ' + connection.threadId);
  start();
});

var start = function() {
  // Start message
  console.log('Welcome to Bamazon!');
  console.log('Here is our current inventory.');
  // show all items id's, product names and price, then start purchase sequence
  selectAllPromise('products').then(makePurchase).catch(catchError);
}

// Pass in table name and loop through items if there are results
function selectAllPromise(tableName) {
  return new Promise(function(resolve, reject) {
    connection.query(`SELECT * FROM ${tableName}`, function(err, results) {
      if (err) {
        reject(err);
        return
      }
      resolve(results);
      for (var i = 0; i < results.length; i++) {
        console.log('ID#: ' + results[i].item_id + ' "' + results[i].product_name + ' Price: ' + results[i].price.toFixed(2));
      }
    });
  })
}

var makePurchase = function() {
  inquirer.prompt([{
  	// get item id to purchase
    name: "itemId",
    type: "input",
    message: "Enter the ID of the product you would like to buy: ",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }, {
  	// get the number of items to purchase
    name: "itemNum",
    type: "input",
    message: "Enter how many units of the product you would like to buy.: ",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }]).then(function(answer) {
  	// get elements of id where the quantity is greater than or equal to the items requested
    var query = "SELECT * FROM products WHERE item_id = ? AND stock_quantity >= ?";
    connection.query(query, [answer.itemId, answer.itemNum], function(err, res1) {
    	if (err) throw err;
	    // if stock_quantity >= to requested units there will be elements in the returned array
	    if (res1.length != 0) {
	      // update the database after subtracting the items requested
	      var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?";
	      connection.query(query, [answer.itemNum, answer.itemId], function(err, res) {
	        if (err) throw err;
	        // Total of the item price multiplied by the item number requested
	        var totalBill = res1[0].price * answer.itemNum;
	        console.log('Your total bill = $', totalBill.toFixed(2));
	        // See inventory
	        // checkAll();
	        runOptions();
	      });
	    }
	    // else reject error
	    else {
	      console.log('Insufficient quantity!');
	      makePurchase();
	    }
	});
  });
}

var runOptions = function() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: ["Make another purchase", "See inventory", "Exit"]
  }).then(function(answer) {
    switch (answer.action) {
      case "Make another purchase":
        makePurchase();
        break;
      case "See inventory":
        checkAll().then(runOptions).catch(catchError);
        break;
      case "Exit":
        exitProgram();
        break;
    }
  });
};
// See all inventory
var checkAll = function() {
  return new Promise(function(resolve, reject) {
    connection.query(`SELECT * FROM products`, function(err, res) {
      if (err) {
        reject(err);
        return
      }
      resolve(res);
      for (var i = 0; i < res.length; i++) {
        console.log('ID#: ' + res[i].item_id + ' "' + res[i].product_name + '" Price: ' + res[i].price.toFixed(2) + ' Quantity: ' + res[i].stock_quantity);
      }
    });
  });
}
// return error
function catchError(reject) {
  console.log('Error: ', reject);
}
// End connection
function exitProgram() {
  connection.end(function(err) {
  // The connection is terminated now 
    console.log('Thanks for shopping with us.')
  });
}