const { checkDB, syncModels } = require('./Database/index')
const {setRelations} = require('./Database/model')
const express = require('express')
const cors = require('cors')     //permite peticiones de todas las direcciones
const morgan = require('morgan')    //nos muestra la informacion de las peticiones en consola
require('dotenv').config()


async function connectDB(){
    await checkDB()     //chequeamos conexion con la base de datos
    setRelations()       //ejecutamos las relaciones entre los modelos
    await syncModels()      //sincronizamos los cambios con la base de datos
}

function launchServer(){

    const app = express()   //definimos nuestra instancia del servidor express
    .use(cors())
    .use(morgan('dev'))
    .use(express.json())    // permite leer json en el body
      // http://localhost:3000/api
    .listen(process.env.SRV_PORT, ()=> {console.log("Server listening: port 3000")})    // definimos la ruta de entrada a nuestra api http://localhost:3000/api
}

async function startAPI(){
    await connectDB()
    launchServer()
}

startAPI()
