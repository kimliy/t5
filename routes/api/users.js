const express = require('express')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../../models/User.js')
const router = express.Router()

router.get('/test', (req, res) => {
    res.json({ code: 200, msg: 'Hi' })
})

//注册
router.post('/register', (req, res) => {
    //console.log(req.body)
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ emali: '该邮箱已被注册😝' })
            } else {
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    identity:req.body.identity,
                    password: req.body.password,
                })
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
            }
        })
})

//登录
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json( "用户不存在!")
            } else if (user.password == password) {
                //配置规则
                const rule = { id: user.id, name: user.name,identity: user.identity,avatar:user.avatar}
                jwt.sign(rule, "secret", { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                return res.status(400).json( "密码错误!" )
            }
        })
})

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    })
})

module.exports = router