module.exports = {
    addLog: async (req,res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.session.user.user_id
            const {baby_id, asleep, awake} = req.body
            const babyLog = await db.logs.add_log(user_id, baby_id, asleep, awake)
            res.status(200).send(babyLog)
        } catch (error) {
            console.log('Error creating log entry.', error)
            res.status(500).send(error)
        }
    },
    getLogsByGuardian: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const logs = await db.logs.get_logs_by_guardian(req.session.user.user_id)
                res.status(200).send(logs)
            }
        } catch (error) {
            console.log('Error getting logs.', error)
            res.status(500).send(error)
        }
    },
    deleteLog: async (req,res) => {
        const db = req.app.get('db')
        const logs = await db.logs.delete_log(req.params.id)
        res.status(200).send(logs)
    }
}