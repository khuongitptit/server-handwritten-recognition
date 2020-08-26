const express = require('express')
const app = express()
const initRoutes = require('./routes/web')
const authRoutes = require('./routes/auth-routes')
var cors = require('cors')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const keys = require('./passport/keys')
const passport = require('passport')
const { session } = require('passport')
require('./passport/passport-setup')
app.use(cors({ origin: true, credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
})

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey],
    })
)
app.use(passport.initialize())
app.use(passport.session())

initRoutes(app)
app.use('/auth', authRoutes)
var url = 'mongodb://localhost:27017/fakeinsta'
mongoose.connect(url)
mongoose.Promise = global.Promise

let port = 3000
app.listen(port, () => {
    console.log(`Running at localhost:${port}`)
})
