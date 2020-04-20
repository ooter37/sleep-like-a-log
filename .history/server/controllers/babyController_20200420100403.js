module.exports = {
    getBabiesByGuardian: async (req,res) => {
        try {
            console.log(req.session.user)
            const db = req.app.get('db')
            if (req.session.user) {
                const babies = await db.babies.get_babies_by_guardian(req.session.user.user_id)
                res.status(200).send(babies)
                console.log(req.session.user)
            }
        } catch (error) {
            console.log('Error getting babies by guardian.', error)
            res.status(500).send(error)
        }
    }
}