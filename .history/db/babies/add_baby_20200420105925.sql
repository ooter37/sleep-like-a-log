INSERT INTO babies (name)
VALUES
($1);

INSERT INTO ownership (user_id, guardian, relationship)
VALUES
($2,true,$3);