const { Model } = require('sequelize') 
const Medicine = require('../Models/medicine.model') 


async function getAllMedicines(req, res) {
    try {
        const medicines = await Medicine.findAll()
        res.status(200).json(medicines) 
    } catch (error) {
        console.error('Error al obtener medicines:', error)
        res.status(500).json({
            message: 'Error al obtener medicines',
            error: error.message
        })
    }
}


async function getOneMedicine(req, res) {
    console.log({body: req.body, params: req.params, query: req.query}) 
    try {
        const medicine = await Medicine.findByPk(req.params.id)
        if (!medicine){ res.status(500).send("Medicine not found!")}
        res.status(200).json(medicine)
    } catch (error) {
        res.status(402).send(error.medicine)
    }
}


async function createMedicine(req, res) {
    try {
        const medicine = await Medicine.create(req.body)
        res.status(201).json({
            message: "Medicine created successfully.",
            medicineId: medicine.id
        }) 
    } catch (error) {
        res.status(400).json({
            message: "Failed to create medicine.",
            error: error.message
        }) 
    }
}
 

async function updateMedicine(req, res) {
    try {
        const [ medicine ] = await Medicine.update(req.body, {
            where: {id: req.params.id},
            returning: true   // para que me devuelva la actividad actualiada
        })
        res.status(200).json({ message: 'Medicamento actualizado exitosamente', medicine: medicine})
    } catch (error) {
        res.status(402).send(error.message)
    }
} 
 

async function deleteMedicine(req, res) {
    try {
        const medicine = await Medicine.destroy({
            where: { id: req.params.id },
        })
        res.status(200).json({text: "Medicine deleted!", medicine: medicine})
    } catch (error) {
        res.status(402).send(error.message)
    }
}


module.exports =  { getAllMedicines, getOneMedicine, updateMedicine, createMedicine, deleteMedicine }