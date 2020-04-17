const bcrypt = require('bcrypt')

module.exports = {
    login: async (req,res) => {
        try {
            const db = req.app.get('db')
            let {email, password} = req.body
            let users = await db.auth.find_user_by_email(email)
            let user = users[0]
            if (!user) {
                return res.status(401).send('Email already registered. Please login.')
            }
            let isAuthenticated = bcrypt.compareSync(password, user.password)
            if (!isAuthenticated) {
                return res.status(401).send('Email or password incorrect.')
            }
            delete user.password
            req.session.user = user
            res.send(req.session.user)
        
        } catch (error) {
            console.log('Error on login', error)
            res.status(500).send(error)
        }
    }
}