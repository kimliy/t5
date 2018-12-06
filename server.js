const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

//引入users.js
const users = require('./routes/api/users.js')
const profiles = require('./routes/api/profiles.js')

//使用body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/test2')
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err))

app.get('/',(req,res) => {
    res.send('Simple Life')
})

//初始化passport
app.use(passport.initialize())
require('./config/passport.js')(passport)

//使用routes
app.use('/api/users',users)
app.use('/api/profiles',profiles)


const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})