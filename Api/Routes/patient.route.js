const { getAllPatients, getOnePatient, updatePatient, deletePatient, createPatient, getAllPatientData }  = require('../Controllers/patient.controller')
const { checkAuth, checkAdmin, checkRelative } = require('../Middleware')
const { route } = require('./user.route')


const router = require('express').Router()


router.get('/getAllPatientData/:id', checkAuth, getAllPatientData)

router.get('/:id', checkAuth, getOnePatient)
router.put('/:id', checkAuth, updatePatient) 
router.delete('/:id', checkAuth,checkRelative, deletePatient) 

//  ADMIN
router.get('/', checkAuth, checkAdmin, getAllPatients) 
router.post('/', checkAuth, checkAdmin, createPatient)



module.exports = router