CREATE OR ALTER PROCEDURE registerCustomer
    @id VARCHAR(255),
    @username VARCHAR(255),
    @password VARCHAR(255),
    @email VARCHAR(255)
AS
BEGIN
    INSERT INTO customer
        (id, username, password, email)
    VALUES
        (@id, @username, @password, @email);
END;