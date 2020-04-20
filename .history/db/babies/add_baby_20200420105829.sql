INSERT INTO babies (name)
VALUES
($1);

INSERT INTO ownership (user_id, baby_id, guardian, relationship)
VALUES
($2,$3,true,$4);