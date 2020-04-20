DELETE FROM ownership
WHERE baby_id = $1;

DELETE FROM babies
WHERE baby_id = $1;

SELECT babies.name,babies.baby_id FROM ownership
JOIN users ON users.user_id = ownership.user_id
JOIN babies ON babies.baby_id = ownership.baby_id
WHERE users.user_id = $1;