const { DataTypes } = require('sequelize')
const { sequelize } = require('../../Database/index')    //importamos la instancia de sequilize creada en la carpeta database

const Activity = sequelize.define('activityc', { // definimos los campos de nuestra tabla
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
    }
    },
    {
        timestamps:false
    })

    module.exports = Activity