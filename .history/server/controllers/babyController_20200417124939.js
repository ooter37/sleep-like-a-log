module.exports = {
    getBabyByGuardian: async (req,res) => {
        try {
            const db = req.app.get('db')
            const babies = await db.babies.get_baby_by_guardian(req.session.user.user_id)
            res.status(200).send(babies)
        } catch (error) {
            console.log('Error getting babies by guardian.', error)
            res.status(500).send(error)
        }
    }
}