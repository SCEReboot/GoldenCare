const router = require('express').Router() //le indicamos que vamos a usar el router de express para que maneje las peticiones

//importamos los archivos de rutas dentro de route

router.use('/user', require('./user.route'))
router.use('/patient', require('./patient.route'))
router.use('/task', require('./task.route') )
router.use('/message', require('./message.route'))
router.use('/activity', require('./actvity.route'))
router.use('/medicine', require('./medicine.route'))


module.exports = router