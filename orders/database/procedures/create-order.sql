CREATE OR ALTER PROCEDURE createOrder
@id VARCHAR(255),
@customer_id VARCHAR(255),
@product_id VARCHAR(255),
@quantity INT

AS BEGIN

    INSERT INTO orders (id, customer_id, product_id, quantity)
    VALUES (@id, @customer_id, @product_id, @quantity)

    UPDATE product SET quantity = quantity - @quantity WHERE id = @product_id

END;