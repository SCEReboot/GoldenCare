const User = require('../Models/user.model')

async function getAllUsers(req, res){
    try {
        const users = await User.findAll()
     console.log(users)
        res.status(200).json(users)
    } catch (error) {
        res.status(402).send(error.message)
    }
}

module.exports = { getAllUsers }