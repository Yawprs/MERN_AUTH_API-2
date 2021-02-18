require('dotenv').config()
const passport = require('passport')
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const options = {
    secretOrKey: process.env.JWT_SECRET,
    // how passport should find and extract the token from the req
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const findUser = (jwt_payload, done) => {
    User.findById(jwt_payload.id)
    .then(foundUser=> done(null, foundUser))
}

//construct the strategy
const strategy = new Strategy(options, findUser)

//register the strategy so that passport uses it 
// when we cal the passport.authenticate() method
passport.use(strategy)

//initialize the passport middlewate based on the above
//configuration 
passport.initialize()

const createUserToken = (req, user) => {
    const validPassword = req.body.password ? 
        bcrypt.compareSync(req.body.password, user.password) : false

        if(!user || !validPassword) {
            const err = new Error('provided email or password is incorrect')
            err.statusCode = 422
            throw err
        } else {
            const payload = {
            id: user_id,
            email: user.email,
            motto: user.motto
            }
            return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600})
        }
}