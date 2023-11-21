const Patient = require('../Models/patient.model')
const Task = require('../Models/task.model')
const User = require('../Models/user.model')


async function getAllTasks(req, res) {
    try {
        const tasks = await Task.findAll()   
        console.log('Solicitud recibida:')   
        res.status(200).json(tasks)   
    } catch (error) {
        console.error('Error al obtener tasks:', error)   
        res.status(500).json({
            message: 'Error al obtener tasks',
            error: error.message
        })   
    }
}


async function getOneTask(req, res) {
    try {
        const task = await Task.findByPk(req.params.id)
        if (!task){ res.status(500).send("Task not found!")}
        res.status(200).json(task)
    } catch (error) {
        res.status(402).send(error.message)
    }
}


async function createTask(req, res) {
    try {
        const task = await Task.create(req.body)   
        const nurse = await User.findByPk(req.body.userId)
        const patient = await Patient.findByPk(req.body.patientId)
        await task.setPatient(patient)
       await task.setUser(nurse)
      
        res.status(201).json({
            message: "Task created successfully.",
            taskId: task.id
        })   
    } catch (error) {
        res.status(400).json({
            message: "Failed to create task.",
            error: error.message
        })   
    }
}


async function updateTask(req, res) {
    try {
        const [ task ] = await Task.update(req.body, {
            where: {id: req.params.id},
            returning: true   // para que me devuelva la tarea actualiada
        })
        res.status(200).json(task)
    } catch (error) {
        res.status(402).send(error.message)
    }
} 


async function deleteTask(req, res){
    try {
        const task = await Task.destroy({
            where: { id: req.params.id },
        })
        res.status(200).json({text: "Task deleted!", task: task})
    } catch (error) {
        res.status(402).send(error.message)
    }
}


module.exports = { getAllTasks, getOneTask, createTask, updateTask, deleteTask } 