const { DataTypes } = require('sequelize')
const { sequelize } = require('../../Database/index')    //importamos la instancia de sequilize creada en la carpeta database

const Activity = sequelize.define('activity', { // definimos los campos de nuestra tabla
    activity_name:{
        type: DataTypes.STRING
    },
    activity_description:{
        type: DataTypes.STRING
    },
    activity_type:{
        type: DataTypes.STRING,
        allowNull: false 
    },
    activity_time:{
        type: DataTypes.TIME
    },
    completed:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    difficulty_level:{
        type: DataTypes.ENUM('easy','intermediate', 'difficult')
    }
    },
    {
        timestamps:false
    })

    module.exports = Activity