SELECT * FROM ownership
JOIN users ON users.user_id = ownership.user_id
JOIN babies ON babies.baby_id = ownership.baby_id;