CREATE OR ALTER PROCEDURE updateProduct
@id VARCHAR(255),
@name VARCHAR(255) = NULL,
@description VARCHAR(255) = NULL,
@price DECIMAL(10,2) = NULL,
@quantity INT = NULL

AS BEGIN

UPDATE product SET name = COALESCE(@name,name), description = COALESCE(@description,description), price = COALESCE(@price,price), quantity = COALESCE(@quantity,quantity) WHERE id = @id

END;