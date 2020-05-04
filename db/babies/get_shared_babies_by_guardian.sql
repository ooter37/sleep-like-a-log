SELECT babies.name, babies.baby_id, babies.identifier, ownership.guardian, ownership.user_id, users.email FROM ownership 
JOIN users ON users.user_id = ownership.user_id
JOIN babies ON babies.baby_id = ownership.baby_id
WHERE ownership.user_id != $1 AND babies.baby_id IN (SELECT baby_id from ownership WHERE user_id = $1) AND guardian = false;