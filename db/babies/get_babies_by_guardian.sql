SELECT babies.name, babies.baby_id, babies.identifier, ownership.guardian FROM ownership
JOIN users ON users.user_id = ownership.user_id
JOIN babies ON babies.baby_id = ownership.baby_id
WHERE users.user_id = $1;