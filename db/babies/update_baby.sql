UPDATE babies
SET name = $1 WHERE baby_id = $2;

SELECT * FROM babies
WHERE baby_id = $2;