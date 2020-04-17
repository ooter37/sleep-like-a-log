//DEPENDENCIES
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')

//IMPORT FROM LOCAL 
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

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