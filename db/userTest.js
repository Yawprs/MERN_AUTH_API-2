//import User model
const User = require('../models/User')

User.create({
    email: 'hakuna@matata.com',
    password: 'hakuna matata',
    motto: 'it means no worries'
}, (err, createdUser) => {
    if(err) console.log('error adding test user', err)
    else console.log('Success!', createdUser)
})