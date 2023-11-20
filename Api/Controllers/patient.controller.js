const Patient = require('../Models/patient.model')
const User = require('../Models/user.model')

async function getAllPatients(req, res) {
    try {
        const patients = await Patient.findAll()   
        console.log('Solicitud recibida:')   
        res.status(200).json(patients)   
    } catch (error) {
        console.error('Error al obtener pacientes:', error)   
        res.status(500).json({
            message: 'Error al obtener pacientes',
            error: error.message
        })   
    }
}


async function getOnePatient(req, res) {
    console.log({body: req.body, params: req.params, query: req.query})  //consultar lo que nos llega en la request
    try {
        const patient = await Patient.findByPk(req.params.id)
        if (!patient){ res.status(500).send("Patient not found!")}
        res.status(200).json(patient)
    } catch (error) {
        res.status(402).send(error.message)
    }
}

async function assignPatientNurse(req, res) {
    try {
        const user = await User.findByPk(res.body.nurseId)
        const patient = await Patient.findByPk(req.body.patientId)
        user.addPatient(patient)
    }catch (error){

    }
}
async function createPatient(req, res) {
    try {
        const patient = await Patient.create(req.body)   
        const user = await User.findByPk(res.locals.user.id)
        user.addRelativePatient(patient)
        res.status(201).json({
            message: "Patient created successfully",
            patientId: patient.id
        })   
    } catch (error) {
        res.status(400).json({
            message: "Failed to create patient",
            error: error.message
        })   
    }
}


async function updatePatient(req, res) {
    try {
        const [patient] = await Patient.update(req.body, {
            where: {id: req.params.id},
        })
        res.status(200).json(patient)
    } catch (error) {
        res.status(402).send(error.message)
    }
} 


async function deletePatient(req, res) {
    try {
        const patient = await Patient.destroy({
            where: { id: req.params.id },
        })
        res.status(200).json({text: "Patient deleted!", patient: patient})
    } catch (error) {
        res.status(402).send(error.message)
    }
}


module.exports = { getAllPatients, getOnePatient, createPatient, updatePatient, deletePatient } 