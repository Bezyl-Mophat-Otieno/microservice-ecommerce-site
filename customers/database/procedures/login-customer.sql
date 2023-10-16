CREATE OR ALTER PROCEDURE loginCustomer
    @email VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM customer
    WHERE email = @email
END;