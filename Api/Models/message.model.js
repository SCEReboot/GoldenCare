const { DataTypes } = require('sequelize')
const { sequelize } = require('../../Database/index')    //importamos la instancia de sequilize creada en la carpeta database

const Message = sequelize.define('message', { // definimos los campos de nuestra tabla
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message_content:{
        type: DataTypes.STRING
    },
    photo:{
        type: DataTypes.STRING,
        allowNull: true  // para que que este campo sea opcional 
    }})

    module.exports = Message