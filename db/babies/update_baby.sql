UPDATE babies
SET name = $2 WHERE baby_id = $1;
UPDATE babies
SET identifier = $3 WHERE baby_id = $1;

SELECT * FROM babies
WHERE baby_id = $1;