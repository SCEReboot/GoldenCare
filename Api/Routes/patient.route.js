const { getAllPatients, getOnePatient, createPatient, updatePatient, deletePatient}  = require('../Controllers/patient.controller')
const { checkAuth, checkAdmin, checkRelative } = require('../Middleware')


const router = require('express').Router()

router.get('/', checkAuth, checkAdmin, getAllPatients) // 
router.get('/:id', checkAuth, getOnePatient)
router.post('/', checkAuth, createPatient)
router.put('/:id', checkAuth, updatePatient) 
router.delete('/:id', checkAuth, deletePatient) 

module.exports = router