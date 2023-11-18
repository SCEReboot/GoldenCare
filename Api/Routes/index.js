const router = require('express').Router() //le indicamos que vamos a usar el router de express para que maneje las peticiones

//importamos los archivos de rutas

const userRouter = require('./user.route')
const patientRouter = require('./patient.route')



router.use('/user', userRouter)
router.use('/patient', patientRouter)


module.exports = router