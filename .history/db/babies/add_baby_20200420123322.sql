with rows as (
INSERT INTO babies (name) VALUES ('test baby1') RETURNING baby_id
)
INSERT INTO ownership (baby_id, user_id, guardian, relationship)
SELECT baby_id, 12, true, 'Father'
FROM rows;