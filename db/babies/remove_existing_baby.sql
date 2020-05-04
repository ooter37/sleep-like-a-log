DELETE FROM ownership
WHERE baby_id = $1 AND user_id = $2;