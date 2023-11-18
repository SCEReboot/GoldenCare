const { DataTypes } = require('sequelize')
const { sequelize } = require('../../Database/index')

const Task = sequelize.define('task', { // definimos los campos de nuestra tabla
    task_description:{  
        type: DataTypes.STRING // ask how many (varchar digits)
    },
    title_description:{
        type: DataTypes.STRING
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{ //opciones
    timestamps: false
})
module.exports = Task