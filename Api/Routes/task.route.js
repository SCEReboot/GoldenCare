const { getMyTasks, getAllTasks, getOneTask, createTask, updateTask, deleteTask } = require('../Controllers/task.controller')
const { checkAuth, checkAdmin } = require('../Middleware')

const router = require('express').Router()


router.get('/myTasks', checkAuth, getMyTasks)


router.get('/',    checkAuth, checkAdmin, getAllTasks)
router.get('/:id',  checkAuth, getOneTask)
router.post('/',    checkAuth, createTask)
router.put('/:id',  checkAuth, updateTask) 
router.delete('/:id',  checkAuth, checkAdmin, deleteTask) 

module.exports = router