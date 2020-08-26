const express = require('express')
const app = express()
const initRoutes = require('./src/routes/web')
const authRoutes = require('./src/routes/auth-routes')
var cors = require('cors')
const mongoose = require('mongoose')
app.use(cors({ origin: true, credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ error: err.message })
})
initRoutes(app)
app.use('/auth', authRoutes)
var url = 'mongodb://localhost:27017/fakeinsta'
mongoose.connect(url)
mongoose.Promise = global.Promise

let port = 3000
app.listen(port, () => {
    console.log(`Running at localhost:${port}`)
})
