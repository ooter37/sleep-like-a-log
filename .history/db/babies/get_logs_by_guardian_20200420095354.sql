SELECT logs.log_id, babies.baby_id, users.user_id, logs.asleep, logs.awake FROM logs
JOIN users ON users.user_id = logs.user_id
JOIN babies ON babies.baby_id = logs.baby_id
WHERE users.user_id = 12;