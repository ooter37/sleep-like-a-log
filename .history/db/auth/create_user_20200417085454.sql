INSERT INTO users (email, hashed_password)
VALUES
($1, $2)

SELECT * FROM users