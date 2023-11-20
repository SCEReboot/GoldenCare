const { getAllUsers, getOneUser, getProfile, createUser, updateUser , deleteUser } = require('../Controllers/user.controller')
const { checkAuth, checkAdmin, checkRelative } = require('../Middleware')


const router = require('express').Router()

router.get('/',checkAuth, checkAdmin, getAllUsers)
router.get('/getProfile',checkAuth, getProfile)
router.get('/:id', checkAuth, getOneUser)
router.post('/', checkAuth,checkAdmin, createUser)
router.put('/:id',checkAuth, updateUser) 
router.delete('/:id', checkAuth, deleteUser) 

module.exports = router