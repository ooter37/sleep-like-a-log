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
    getSharedBabiesByGuardian: async (req,res) => {
        try {
            const db = req.app.get('db')
            const babies = await db.babies.get_shared_babies_by_guardian(req.session.user.user_id)
            res.status(200).send(babies)
        } catch (error) {
            console.log('Error getting shared babies by guardian.', error)
            res.status(500).send(error)
        }
    },
    addBaby: async (req,res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.session.user.user_id
            const {babyName, identifier} = req.body
            const newBaby = await db.babies.add_baby(babyName, identifier, user_id)
            res.status(200).send(newBaby)
        } catch (error) {
            console.log('Error adding baby.', error)
            res.status(500).send(error)
        }
    },
    deleteBaby: async (req,res) => {
        try {
                const db = req.app.get('db')
                const baby = await db.babies.delete_baby(req.params.id)
                res.status(200).send(baby)
        } catch (error) {
            console.log('Error deleting baby.', error)
            res.status(500).send(error)
        }
    },
    removeExisting: async (req,res) => {
        try {
                const db = req.app.get('db')
                console.log(req.params)
                const baby = await db.babies.remove_existing_baby(req.params.babyid,req.params.userid)
                res.status(200).send(baby)
        } catch (error) {
            console.log('Error removing existing baby.', error)
            res.status(500).send(error)
        }
    },
    updateBaby: async (req,res) => {
        try {
            const db = req.app.get('db')
            const {id} = req.params
            const {babyName, babyIdentifier} = req.body
            const baby = await db.babies.update_baby(id, babyName, babyIdentifier)
            res.status(200).send(baby)
        } catch (error) {
            console.log('Error updating baby.', error)
            res.status(500).send(error)
        }
    },
    addExistingBaby: async (req,res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.session.user.user_id
            const {existingName, existingIdentifier, existingId} = req.body
            let existingBabies = await db.babies.find_existing_baby(existingName,existingIdentifier,existingId)
            let baby = existingBabies[0]
            let checkIsOnAccount = await db.babies.baby_already_added(user_id, existingId)
            let onAccount = checkIsOnAccount[0]
            if (!baby) {
                return res.status(400).send('Baby name, ID, and/or identifier incorrect.')
            } else if (onAccount) {
                return res.status(400).send('That baby is already on your account.')
            } else {
                const baby_id = baby.baby_id
                const babies = await db.babies.add_existing_baby(baby_id, user_id)
                res.status(200).send(babies)
            }
        } catch (error) {
            console.log('Error adding existing baby.', error)
            res.status(500).send(error)
        }
    }
}