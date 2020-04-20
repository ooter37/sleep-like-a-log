-- with rows as (
-- INSERT INTO babies (name) VALUES ($1) RETURNING baby_id
-- )
-- INSERT INTO ownership (baby_id, user_id, guardian, relationship)
-- SELECT baby_id, $2, true, $3
-- FROM rows;

INSERT INTO babies (name)
VALUES 
($1);