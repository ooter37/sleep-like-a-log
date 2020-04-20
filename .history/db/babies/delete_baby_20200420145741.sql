DELETE FROM ownership
WHERE baby_id = $1;

DELETE FROM babies
WHERE baby_id = $1;
