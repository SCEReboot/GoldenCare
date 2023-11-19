const Activity = require('../Models/activity.model')


async function getAllActivities(req, res) {
    try {
        const activities = await Activity.findAll() 
        res.status(200).json(activities) 
    } catch (error) {
        console.error('Error al obtener activities:', error) 
        res.status(500).json({
            message: 'Error al obtener activities',
            error: error.message
        }) 
    }
}


async function getOneActivity(req, res) {
    console.log({body: req.body, params: req.params, query: req.query})  //consultar lo que nos llega en la request
    try {
        const activity = await Activity.findByPk(req.params.id)
        if (!activity){ res.status(500).send("Activity not found!")}
        res.status(200).json(activity)
    } catch (error) {
        res.status(402).send(error.activity)
    }
}


async function createActivity(req, res) {
    try {
        const activity = await Activity.create(req.body) 
        res.status(201).json({
            message: "Activity created successfully.",
            activityId: activity.id
        }) 
    } catch (error) {
        res.status(400).json({
            message: "Failed to create activity.",
            error: error.message
        }) 
    }
}


async function updateActivity(req, res) {
    try {
        const [ activity ] = await Activity.update(req.body, {
            where: {id: req.params.id},
            returning: true   // para que me devuelva la actividad actualiada
        })
        res.status(200).json(activity)
    } catch (error) {
        res.status(402).send(error.message)
    }
} 


async function deleteActivity(req, res) {
    try {
        const activity = await Activity.destroy({
            where: { id: req.params.id },
        })
        res.status(200).json({text: "Activity deleted!", activity: activity})
    } catch (error) {
        res.status(402).send(error.message)
    }
}


module.exports = { getAllActivities, getOneActivity, createActivity, updateActivity, deleteActivity } 