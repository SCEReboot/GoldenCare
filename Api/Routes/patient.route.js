const { getAllPatients, getOnePatient, createPatient, updatePatient, deletePatient}  = require('../Controllers/patient.controller')


const router = require('express').Router()

router.get('/', getAllPatients)
router.get('/:id', getOnePatient)
router.post('/', createPatient)
router.put('/:id', updatePatient) 
router.delete('/:id', deletePatient) 

module.exports = router