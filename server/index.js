//DEPENDENCIES
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')

//IMPORT 
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env
const {login, register, logout, getUser, userData} = require('./controllers/authController')
const {getBabiesByGuardian, addBaby, deleteBaby, updateBaby, addExistingBaby, removeExisting, getSharedBabiesByGuardian} = require('./controllers/babyController')
const {addLog, deleteLog, getLogsByBaby} = require('./controllers/logController')

//TOP-LEVEL MIDDLEWARE
const app=express()
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookies: {
        maxAge: 1000*60*60*24*14
    }
}))
app.use( express.static( `${__dirname}/../build` ) );
//SERVER & DB SETUP
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db',db)
    console.log('connected to db')
}).catch(err => console.log('error getting db', err))
app.listen(SERVER_PORT, () => console.log(`server listening on port ${SERVER_PORT}`))

//AUTH ENDPOINTS
app.post('/auth/login', login)
app.post('/auth/register', register)
app.get('/auth/logout', logout)
app.get('/auth/current', getUser)
app.get('/auth/user-data', userData)

//BABY ENDPOINTS
app.post('/api/babies', addBaby)
app.get('/api/babies', getBabiesByGuardian)
app.delete('/api/babies/:id', deleteBaby)
app.put('/api/babies/:id', updateBaby)
app.put('/api/babies', addExistingBaby)
app.delete('/api/babies/:babyid/:userid', removeExisting)
app.get('/api/shared', getSharedBabiesByGuardian)

//LOG ENDPOINTS
app.post('/api/logs', addLog)
// app.get('/api/logs', getLogsByGuardian)
app.delete('/api/logs/:id', deleteLog)
app.get('/api/logs/:id', getLogsByBaby)