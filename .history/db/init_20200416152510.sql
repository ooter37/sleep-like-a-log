CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(30),
    hashed_password TEXT,
    img TEXT
);

INSERT INTO users (email, img)
VALUES
('derek@mail.com'),
('meghan@mail.com'),
('babysiiter@mail.com');

CREATE TABLE babies (
    baby_id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    img TEXT
);

INSERT INTO babies (name)
VALUES
('eloise'),
('harriet'),
('leo');

CREATE TABLE owmership (
    owner_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    baby_id INT REFERENCES babies(baby_id)
);

INSERT INTO ownership (user_id, baby_id)
VALUES
(1,1),
(1,3),
(2,1),
(2,2),
(3,1);