module.exports = {
    addLog: (req,res) => {
        try {
            const db = req.app.get('db')
            const {asleep, awake} = req.body
        } catch (error) {
            console.log('Error creating log entry.', error)
            res.status(500).send(error)
        }
    }
}