const User = require('../Api/Models/user.model')
const Message = require('../Api/Models/message.model')
const Patient = require('../Api/Models/patient.model')
const Task = require('../Api/Models/task.model')
const Activity = require('../Api/Models/activity.model')
const Medicine = require('../Api/Models/medicine.model')
const PatientMedicine = require("../Api/Models/patientMedicine.model")

function setRelations(){

    User.belongsToMany(User, { through: Message, as: 'receiver' })

    User.belongsToMany(Patient, { through: "patient_nurse"}) 
    Patient.belongsToMany(User, { through: "patient_nurse"})

    User.belongsToMany(Patient, { through: "patient_relative", as: 'relativePatient'}) 
    Patient.belongsToMany(User, { through: "patient_relative", as: 'patientRelative'})

    User.hasMany(Task)
    Task.belongsTo(User)

    Activity.belongsToMany(Patient, { through: "activity_patient"}) 
    Patient.belongsToMany(Activity, { through: "activity_patient"})

    Patient.belongsToMany(Medicine, { through: PatientMedicine}) 
    Medicine.belongsToMany(Patient, { through: PatientMedicine})

}

module.exports = { setRelations }