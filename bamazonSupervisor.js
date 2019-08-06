var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "BamazonDB"
})

function begin(){
    inquirer.prompt ([{
        type: "list",
        name: "doList",
        message: "what would you like to do ?",
        choices: ["View Product Sales by Department", "Create New Department", "End Session"]
}]).then(function(ans){
    switch(ans.doList){
        case "View Product Sales By Department": viewProductByDept();
        break;
        case "Create New Department": createNewDept();
        break;
        case "End Session": console.log("see you later buh bye!");
    }
});
}

//view product sales by department
function viewProductByDept(){
    //prints the items for sale and their details
    connection.query('SELECT * FROM Departments', function(err, res){
      if(err) throw err;
      console.log('==== Product Sales by Department ====');
      console.log('----------------------------------------------------------------------------------------------------')
  
      for(var i = 0; i<res.length;i++){
        console.log("department_id: " + res[i].department_id + " | " + "department_name: " + res[i].department_name + " | " + "over_head_costs: " + (res[i].over_head_costs).toFixed(2) + " | " + "product sales: " + (res[i].total_sales).toFixed(2) + " | " + "total profit: " + (res[i].total_sales - res[i].over_head_costs).toFixed(2));
        console.log('--------------------------------------------------------------------------------------------------')
      }
      begin();
    })
  }

  function createNewDept(){
    console.log('==== Creating New Department ====');
    //prompts to add deptName and numbers. if no value is then by default = 0
    inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "department_name: "
    }, {
      type: "input",
      name: "over_head_costs",
      message: "over_head_costs: ",
      default: 0,
      validate: function(val){
        if(isNaN(val) === false){return true;}
        else{return false;}
      }
    }, {
      type: "input",
      name: "prod_sales",
      message: "prod_sales:",
      default: 0,
      validate: function(val){
        if(isNaN(val) === false){return true;}
        else{return false;}
      }
    }

]).then(function(ans){
    connection.query('INSERT INTO Departments SET ?',{
        department_name: ans.department_name,
        over_head_costs: ans.over_head_costs,
        total_sales: ans.prod_sales
    }, function(err, res){
      if(err) throw err;
      console.log('Another department was added.');
      begin();
    })
    
  });
}

begin();