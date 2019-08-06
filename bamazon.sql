DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  id INTEGER(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL, 
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sonic", "Entertainment", 34.99, 20),
("Street Fighter", "Entertainment", 44.99, 30),
("Aladdin", "Entertainment", 40.99, 25),
("Mega Man", "Entertainment", 24.99, 80),
("The Lion King", "Entertainment", 42.99, 50),
("Mortal Kombat", "Entertainment", 30.99, 35),
("Shinobi", "Entertainment", 33.50, 40),
("Golden Axe", "Entertainment", 34.99, 20),
("columns", "Entertainment", 14.99, 200),
("NBA Jam", "Entertainment", 43.49, 20);

CREATE TABLE Departments(
    department_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    total_sales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(department_id));

INSERT INTO Departments(department_id, over_head_costs, total_sales)
VALUES ('ENTERTAINMENT', 60000.00, 17000.00),
    ('ELECTRONICS', 20000.00, 12000.00),
    ('HOME', 40000.00, 16000.00),
    ('BODY & HEALTH', 5000.00, 15000.00),
    ('GROCERY', 1800.00, 36000.00),
    ('KIDS', 30000.00, 11000.00),
    ('CLOTHING', 35000.00, 15000.00),
    ('SPORTS & OUTDOORS', 12000.00, 12000.00);