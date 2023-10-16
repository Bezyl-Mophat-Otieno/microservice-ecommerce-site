CREATE OR ALTER PROCEDURE addProduct
@id VARCHAR(255),
@name VARCHAR(255),
@description VARCHAR(255),
@price DECIMAL(10,2),
@quantity INT
AS BEGIN
    INSERT INTO product (id, name, description, price, quantity)
    VALUES (@id, @name, @description, @price, @quantity)

END;