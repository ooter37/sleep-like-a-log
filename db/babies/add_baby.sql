with rows as (
INSERT INTO babies (name, identifier) VALUES ($1, $2) RETURNING baby_id
)
INSERT INTO ownership (baby_id, user_id, guardian)
SELECT baby_id, $3, true
FROM rows;

-- with rows as (
-- INSERT INTO babies (name) VALUES ($1) RETURNING baby_id
-- )
-- INSERT INTO ownership (baby_id, user_id, guardian, identifier)
-- SELECT baby_id, $2, true, $3
-- FROM rows;