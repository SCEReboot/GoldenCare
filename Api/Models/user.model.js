const { DataTypes } = require('sequelize')
const { sequelize } = require('../../Database/index')    //importamos la instancia de sequilize creada en la carpeta database

const User = sequelize.define('user', { // definimos los campos de nuestra tabla
    first_name:{
        type: DataTypes.STRING
    },
    last_name:{
        type: DataTypes.STRING
    },
    date_of_birth:{
        type: DataTypes.DATE
    },
    gender:{
        type: DataTypes.ENUM('male','female', 'other')
    },
    contact_number:{
        type: DataTypes.INTEGER
    },
    email:{
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.ENUM('admin', 'user', 'caregiver')
    }
},
{ //opciones
    timestamps: false, // evita que nos cree las columnas updateAt y createAt
})
module.exports = User