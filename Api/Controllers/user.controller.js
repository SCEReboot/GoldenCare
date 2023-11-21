const Patient = require("../Models/patient.model") 
const Task = require("../Models/task.model") 
const User = require("../Models/user.model") 

async function getAllUsers(req, res) {

  try {
    const users = await User.findAll() 
    console.log("Solicitud recibida: ") 
    res.status(200).json(users) 
  } catch (error) {
    res.status(402).send(error.message) 
  }
}

async function getOneUser(req, res) {

    try {
    const user = await User.findByPk(req.params.id) 
    if (!user) {
      res.status(500).send("Usuario no encontrado") 
    }
    res.status(200).json(user) 
  } catch (error) {
    res.status(402).send(error.message) 
  }
}

async function getAllDataUser(req, res) {

    try {
      if (res.locals.user.role === "relative") {
        const user = await User.findByPk(res.locals.user.id, {
          attributes: ['id', 'first_name', 'last_name', 'email'],
          include: [
            {
              model: Patient,
              as: "relativePatient",
              attributes: ['id', 'first_name', 'last_name']
            },
            {
              model: Task,
            },
          ],
        })
        return res.status(200).json(user) 
      } else {
        const user = await User.findByPk(res.locals.user.id, {
          attributes: ['id', 'first_name', 'last_name', 'email'],
          include: [
            {
              model: Patient,
              attributes: ['id', 'first_name', 'last_name']
            },
            {
              model: Task,
            },
          ],
        })
        return res.status(200).json(user) 
      }
  
    } catch (error) {
      res.status(402).send(error.message)
    }
}


async function getProfile(req, res) {

  try {
    const user = await User.findByPk(res.locals.user.id) 
    if (!user) {
      res.status(500).send("Usuario no encontrado") 
    }
    res.status(200).json(user) 
  } catch (error) {
    res.status(402).send(error.message) 
  }
}


async function createUser(req, res) {

  try {
    const user = await User.create(req.body) 
    res.status(200).send("User created!") 
  } catch (error) {
    res.status(402).send(error.message) 
  }
}


async function updateUser(req, res) {

  try {
    const [user] = await User.update(req.body, {
      where: { id: req.params.id },
    })
    res.status(200).json(user) 
  } catch (error) {
    res.status(402).send(error.message) 
  }
}


async function updateOwnProfile(req, res) {

    try {
      const [user] = await User.update(req.body, {
        where: { id: res.locals.user.id },
     })
      res.status(200).json(user) 
    } catch (error) {
      res.status(402).send(error.message) 
    }
  }

async function deleteUser(req, res) {

  try {
    const user = await User.destroy({
      where: { id: req.params.id },
    })
    res.status(200).json({ text: "usuario eliminado", user: user }) 
  } catch (error) {
    res.status(402).send(error.message) 
  }
}

async function createPatient(req, res) {
    try {
        const patient = await Patient.create(req.body)   
        const user = await User.findByPk(res.locals.user.id)
        user.addRelativePatient(patient)
        res.status(201).json({
            message: "Patient created successfully",
            patientId: patient.id
        })   
    } catch (error) {
        res.status(400).json({
            message: "Failed to create patient",
            error: error.message
        })   
    }
}


async function assignPatientNurse(req, res) {

    try {
        const user = await User.findByPk(req.body.userId)
        const patient = await Patient.findByPk(req.body.patientId)
  
        if (!user) {
            return res.status(404).json({ message: 'Nurse not found.' })
        }

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found.' })
        }

        await user.addPatient(patient);
        res.status(200).json({ message: 'Patient assigned to nurse successfully.' })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', error: error.message })
    }
}


module.exports = {
  getAllUsers,
  getOneUser,
  getProfile,
  createUser,
  updateUser,
  deleteUser,
  getAllDataUser,
  createPatient,
  assignPatientNurse,
  updateOwnProfile,
} 
