const { getAllActivities, getOneActivity, createActivity, updateActivity, deleteActivity } = require('../Controllers/activity.controller')


const router = require('express').Router()

router.get('/', getAllActivities)
router.get('/:id', getOneActivity)
router.post('/', createActivity)
router.put('/:id', updateActivity) 
router.delete('/:id', deleteActivity) 

module.exports = router