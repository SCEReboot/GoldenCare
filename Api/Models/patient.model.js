const { DataTypes } = require('sequelize')
const { sequelize } = require('../../Database/index')    //importamos la instancia de sequilize creada en la carpeta database

const Patient = sequelize.define('patient', { // definimos los campos de nuestra tabla
    first_name:{
        type: DataTypes.STRING
    },
    last_name:{
        type: DataTypes.STRING
    },
    // date_of_birth:{
    //     type: DataTypes.DATE
    // },
    gender:{
        type: DataTypes.ENUM('male','female', 'other')
    },
    blood_type:{
        type: DataTypes.STRING
    },
    chronic_illnesses:{
        type: DataTypes.STRING,
    },
    allergies:{
        type: DataTypes.STRING
    },
    dietary_type:{
        type: DataTypes.STRING
    },
    mobility_requirements:{
        type: DataTypes.STRING,
    },
    emergency_protocol:{
        type: DataTypes.STRING
    },
    biography:{
        type: DataTypes.STRING
    },
    doctor_contact:{
        type: DataTypes.INTEGER
    },
    photo_patient:{
        type: DataTypes.STRING
    }
},
{ //opciones
    timestamps: false, // evita que nos cree las columnas updateAt y createAt
})
module.exports = Patient