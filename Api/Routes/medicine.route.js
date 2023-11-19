const { getAllMedicines, getOneMedicine, createMedicine, updateMedicine, deleteMedicine} = require('../Controllers/medicine.controller')


const router = require('express').Router()

router.get('/', getAllMedicines)
router.get('/:id', getOneMedicine)
router.post('/', createMedicine)
router.put('/:id', updateMedicine) 
router.delete('/:id', deleteMedicine) 
    
module.exports = router