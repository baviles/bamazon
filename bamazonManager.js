var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazonDB"
})

function begin(){
    inquirer.prompt([
        {
            type: "list",
            name:"viewProduct",
            message: "What would you like to do",
            choices: ["View Products For Sale", "view Low Inventory","Add To Inventory","Add New Product","End Session"]

        }]).then(function(ans) {
            switch(ans.viewProduct){
                case "View Products For Sale": viewProducts();
                break;
                case "view Low Inventory": viewLowInventory();
                break;
                case "Add To Inventory": addToInventory();
                break;
                case "Add New Product": addNewProduct();
                break;
                case "End Session": console.log("see you next time")
            }
        });
}

function viewProducts(){
    console.log("==== Viewing Products ====");

    connection.query("SELECT * FROM Products", function(err, res){
        if(err) throw err;
        console.log("----------------------------------------------------------------------------------------------------")

        for(var i = 0; i<res.length;i++){
            console.log(`id: ${res[i].id} | product: ${res[i].product_name} | department: ${res[i].department_name} | price: $${res[i].price} | qty: ${res[i].stock_quantity}`)
            console.log("----------------------------------------------------------------------------------------------------")
        }

        begin();
    });
}

function viewLowInventory(){
    console.log("==== Viewing Low Inventory ====");
    
    connection.query('SELECT * FROM Products', function(err, res){
        if(err) throw err;
        console.log("----------------------------------------------------------------------------------------------------")    
        
        for(var i = 0; i <res.length;i++){
            if(res[i].stock_quantity <=5) {
                console.log(`id: ${res[i].id} | product: ${res[i].product_name} | department: ${res[i].department_name} | price: $${res[i].price} | qty: ${res[i].stock_quantity}`)    
                console.log("----------------------------------------------------------------------------------------------------")
            }
        }
        begin();
    });
}

function addToInventory(){
    console.log("==== Adding To Inventory ====");

    connection.query("SELECT * FROM Products", function(err,res){
        if(err) throw err;
        var itemsArray = [];

        for (var i=0; i<res.length; i++){
            itemsArray.push(res[i].product_name);
        }

        inquirer.prompt([{
            type: "list",
            name: "product",
            choices: itemsArray,
            message: "Which item would you like to add inventory?"
          }, {
            type: "input",
            name: "qty",
            message: "How much would you like to add?",
            validate: function(value){
              if(isNaN(value) === false){return true;}
              else{return false;}
            }
            }]).then(function(ans){
              var currentQty;
              for(var i=0; i<res.length; i++){
                if(res[i].product_name === ans.product){
                  currentQty = res[i].stock_quantity;
                }
              }
              connection.query('UPDATE Products SET ? WHERE ?', [
                {stock_quantity: currentQty + parseInt(ans.qty)},
                {product_name: ans.product}
                ], function(err, res){
                  if(err) throw err;
                  console.log('The quantity was updated.');
                  begin();
                });
              })
          });
        }

        function addNewProduct(){
            console.log("==== Adding New Product====");
            var deptNames = [];

            connection.query('SELECT * FROM Departments', function(err, res){
                if(err) throw err;
                for(var i = 0; i<res.length; i++){
                  deptNames.push(res[i].department_name);
                }
              })

              inquirer.prompt([{
                type: "input",
                name: "product",
                message: "Product: ",
                validate: function(value){
                  if(value){return true;}
                  else{return false;}
                }
              }, {
                type: "list",
                name: "department",
                message: "Department: ",
                choices: deptNames
              }, {
                type: "input",
                name: "price",
                message: "Price: ",
                validate: function(value){
                  if(isNaN(value) === false){return true;}
                  else{return false;}
                }
              }, {
                type: "input",
                name: "quantity",
                message: "Quantity: ",
                validate: function(value){
                  if(isNaN(value) == false){return true;}
                  else{return false;}
                }
              }]).then(function(ans){
                connection.query('INSERT INTO Products SET ?',{
                  product_name: ans.product,
                  department_name: ans.department,
                  Price: ans.price,
                  stock_quantity: ans.quantity
                }, function(err, res){
                  if(err) throw err;
                  console.log('Another item was added to the store.');
                  begin();
                })
                
              });
            }

            begin();

