INSERT INTO users (email, hashed_password)
VALUES
(${email}, ${hashed_password})
RETURNING *;