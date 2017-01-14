# MySQL-Inquirer

## bamazonCustomer.js

1. Running this application (via node.js) will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
2. The app will then prompt users with two messages.
	* The first should ask them the ID of the product they would like to buy.
	* The second message should ask how many units of the product they would like to buy.
3. The app will check if the store has enough of the product to meet the request.
	* If not, `Insufficient quantity!` will display, the order will not go through, and the two messages will display again.
  * If the store *does* have enough of the product, the customer's order will be filled, the database will be updated to reflect the purchases, and a total price for those items will be given.
4. Once items have been *purchased*, additional options will be displayed.
  * Make another purchase
  * See inventory (will display item quantities)
  * Exit
  
###### Video
A [video of the program working](blob/master/bamazon.mov) has been uploaded.
