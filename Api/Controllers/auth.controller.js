const User = require('../Models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function login(req, res) {

    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) return res.status(404).send('Error: Email or Password incorrect') // Error in case we don't find the email
        const comparePass = bcrypt.compareSync(req.body.password, user.password)  // comparamos la contraseña enviada sin encriptar con la encriptada en la base de datos

        if (comparePass) {
            const payload = { email: user.email } // información que incluimos en el token
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })  // generamos el token
            return res.status(200).send({ token })
        } else {
            return res.status(404).json('Error: Email or Password incorrect')
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function signup(req, res) {
    // Generar un número aleatorio de rondas de sal para el cifrado
    const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS))
  

    // Cifrar la contraseña proporcionada antes de almacenarla en la base de datos
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
    req.body.password = hashedPassword

    try {
        const user = await User.create(req.body)
        console.log(user)
        // Generar un token JWT para el nuevo usuario
        const payload = { email: user.email }
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
        return res.status(200).json({ token })

    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = { signup, login }
