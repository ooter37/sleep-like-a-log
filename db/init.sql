CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(30),
    hashed_password TEXT,
    img TEXT
);

INSERT INTO users (email)
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

CREATE TABLE ownership (
    owner_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    baby_id INT REFERENCES babies(baby_id),
    guardian BOOLEAN,
    relationship TEXT
);

INSERT INTO ownership (user_id, baby_id, guardian, relationship)
VALUES
(1,1,true,'Father'),
(1,3,false,'Owner'),
(2,1,true,'Mother'),
(2,2,false,'Owner'),
(3,1,false,'Babysitter');

CREATE TABLE logs (
    log_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    baby_id INT REFERENCES babies(baby_id),
    asleep TEXT,
    awake TEXT
);

ALTER TABLE ownership
RENAME COLUMN relationship TO identifier;

