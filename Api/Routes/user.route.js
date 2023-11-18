const { getAllUsers, getOneUser, getProfile, createUser, updateUser , deleteUser} = require('../Controllers/user.controller')


const router = require('express').Router()

router.get('/', getAllUsers)
router.get('/getProfile', getProfile)
router.get('/:id', getOneUser)
router.post('/', createUser)
router.put('/:id', updateUser) 
router.delete('/:id', deleteUser) 

module.exports = router