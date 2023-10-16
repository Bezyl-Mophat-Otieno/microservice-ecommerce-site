CREATE OR ALTER PROCEDURE getMyOrders
@customer_id VARCHAR(255)

AS BEGIN

SELECT p.id, p.name, p.price, o.quantity as order_quantity FROM product p
INNER JOIN orders o ON o.product_id = p.id
WHERE o.customer_id = @customer_id

END 