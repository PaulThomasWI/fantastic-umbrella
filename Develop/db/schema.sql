-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

/*
USE ecommerce_db;

CREATE TABLE Category (
    id INTEGER AUTO_INCREMENT PRIMARY KEY 
    , category_name VARCHAR(128) NOT NULL
);

CREATE TABLE Product (
    id INTEGER AUTO_INCREMENT PRIMARY KEY 
    , product_name VARCHAR(128) NOT NULL
    , price DECIMAL NOT NULL
    , stock INTEGER NOT NULL
    , category_id INTEGER
    , CONSTRAINT fk_category FOREIGN KEY(id) REFERENCES Category(id)
);

CREATE TABLE Tag (
    id INTEGER AUTO_INCREMENT PRIMARY KEY 
    , tag_name VARCHAR(128)
);

CREATE TABLE ProductTag (
    id INTEGER AUTO_INCREMENT PRIMARY KEY 
    , product_id INTEGER
    , tag_id INTEGER
    , CONSTRAINT fk_product FOREIGN KEY(id) REFERENCES Product(id)
    , CONSTRAINT fk_tag FOREIGN KEY(id) REFERENCES Tag(id)        
);
*/