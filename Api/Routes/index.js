const router = require('express').Router() //le indicamos que vamos a usar el router de express para que maneje las peticiones

//importamos los archivos de rutas

const userRouter = require('./user.route')

//definimos las rutas

router.use('/', userRouter)


module.exports = router