const { getAllUsers } = require('../Controllers/user.controller')


const router = require('express').Router()

router.get('/user', getAllUsers)



module.exports = router