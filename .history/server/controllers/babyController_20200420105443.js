module.exports = {
    getBabiesByGuardian: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const babies = await db.babies.get_babies_by_guardian(req.session.user.user_id)
                res.status(200).send(babies)
            }
        } catch (error) {
            console.log('Error getting babies by guardian.', error)
            res.status(500).send(error)
        }
    },
    addBaby: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const user_id = req.session.user.user_id
                const {name, guardian, relationship, baby_id} = req.body
                const newBaby = await db.babies.add_new_baby(name, user_id, baby_id, guardian, relationship)
                res.status(200).send(newBaby)
            }
        } catch (error) {
            console.log('Error adding baby.', error)
            res.status(500).send(error)
        }
    }
}