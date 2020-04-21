module.exports = {
    addLog: async (req,res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.session.user.user_id
            const {baby_id, asleep, awake} = req.body
            const babyLog = await db.log.add_new_log(user_id, baby_id, asleep, awake)
            res.status(200).send(babyLog)
        } catch (error) {
            console.log('Error creating log entry.', error)
            res.status(500).send(error)
        }
    }
}