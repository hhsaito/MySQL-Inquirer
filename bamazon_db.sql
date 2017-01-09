CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id integer not null auto_increment,
    product_name varchar(100) not null,
    department_name varchar(50) not null,
    price DECIMAL(8,2),
    stock_quantity INTEGER default 0,
    primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Parker Fly Deluxe Electric Guitar", "Musical Instruments", 4304.46, 15),
("simplehuman Code R Custom Fit Liners", "Household Supplies", 14.99, 380),
("CycleOps Fluid Trainer", "Sports & Outdoors", 299.99, 125),
("Hatful of Hollow", "Music", 15.60, 217),
("Logan Stacking Mug", "Dining & Entertainment", 4.95, 391),
("Wustof Steak Knife Set", "Kitchen", 79.95, 59),
("Frye Logan Leather Jump Boots", "Footwear", 161.00, 10),
("Britax Roundabout Convertible Car Seat", "Baby", 144.49, 215),
("SmartWool Outdoor Sport Light Socks", "Footwear", 9.99, 389),
("Pearl Masters BCX924XSP Birch 4-Piece Shell Pack with 22 in. Bass Drum Lava Bubinga", "Musical Instruments", 1499.00, 29);