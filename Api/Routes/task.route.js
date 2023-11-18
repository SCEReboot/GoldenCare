const {  getAllTasks, getOneTask, createTask, updateTask, deleteTask } = require('../Controllers/task.controller')

const router = require('express').Router()

router.get('/', getAllTasks)
router.get('/:id', getOneTask)
router.post('/', createTask)
router.put('/:id', updateTask) 
router.delete('/:id', deleteTask) 

module.exports = router