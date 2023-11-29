const { getAllUsers, getOneUser, getProfile, createUser, updateUser , deleteUser, getAllDataUser, createPatient, assignPatientNurse, updateOwnProfile, getNurses } = require('../Controllers/user.controller')
const { checkAuth, checkAdmin, checkRelative } = require('../Middleware')


const router = require('express').Router()


router.get('/getData',checkAuth, getAllDataUser)
router.get('/getProfile',checkAuth, getProfile)
router.get('/getNurses', checkAuth,checkRelative, getNurses)  //nuevo
router.post('/createPatient', checkAuth, checkRelative, createPatient)  //necesito el endpoint con id del user para que cree al paciente a ese  user 
router.put('/assignPatient', checkAuth, assignPatientNurse)
router.put('/update',checkAuth , updateOwnProfile) 



//  ADMIN
router.get('/',checkAuth, getAllUsers)
router.get('/:id', checkAuth, checkAdmin, getOneUser)
router.post('/', checkAuth,checkAdmin, createUser)
router.put('/:id',checkAuth ,checkAdmin, updateUser) 
router.delete('/:id', checkAuth, checkAdmin, deleteUser) 


module.exports = router