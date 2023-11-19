const { DataTypes } = require('sequelize')
const { sequelize } = require('../../Database/index')    //importamos la instancia de sequilize creada en la carpeta database

const Medicine = sequelize.define('medicine', {
    medicine_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosage: {
      type: DataTypes.STRING, // O ajusta el tipo de datos según tus necesidades
      allowNull: true,
    },
    schedule_medicine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reminder: {
      type: DataTypes.STRING,
      allowNull: true,
    }
},
{
    timestamps: false
})
  module.exports = Medicine;