CREATE TABLE orders (
    id VARCHAR (255) PRIMARY KEY,
    customer_id VARCHAR(255),
    product_id VARCHAR(255),
    quantity INT,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
)