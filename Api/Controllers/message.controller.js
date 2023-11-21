const Message = require('../Models/message.model')
const User = require('../Models/user.model')


async function createMessage(req, res) {
    try {
        const sender = await User.findByPk(res.locals.user.id)
        const receiver = await User.findByPk(req.body.receiver)
        sender.addReceiver(receiver, { through: {message_content: req.body.message_content}})
        res.status(201).json({
            message: "Message created successfully."
        })  
    } catch (error) {
        res.status(400).json({
            message: "Failed to create message.",
            error: error.message
        })  
    }
}



//////////////////////////
//
// Importar los modelos
//const { User, Message } = require('../models');

// Función para obtener una lista de usuarios y sus mensajes
async function getUsersAndMessages(userId) {
    try {
        // Obtener todos los mensajes relacionados con el usuario
        const messages = await Message.findAll({
            where: {
                [Op.or]: [{ senderId: userId }, { receiverId: userId }],
            },
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'userName'],
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'userName'],
                },
            ],
        });

        // Procesar la información para presentarla de la manera deseada
        const userList = [];
        messages.forEach(message => {
            const otherUser = message.sender.id === userId ? message.receiver : message.sender;
            const existingUser = userList.find(user => user.userId === otherUser.id);

            if (!existingUser) {
                userList.push({
                    userId: otherUser.id,
                    userName: otherUser.userName,
                    messages: [
                        {
                            messageId: message.id,
                            content: message.content,
                            createdAt: message.createdAt,
                            sender: {
                                userId: message.sender.id,
                                userName: message.sender.userName,
                            },
                        },
                    ],
                });
            } else {
                existingUser.messages.push({
                    messageId: message.id,
                    content: message.content,
                    createdAt: message.createdAt,
                    sender: {
                        userId: message.sender.id,
                        userName: message.sender.userName,
                    },
                });
            }
        });

        return userList;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener usuarios y mensajes');
    }
}

// Ejemplo de uso:
// const usersAndMessages = await getUsersAndMessages(1); // Obtener usuarios y mensajes del usuario con ID 1
// console.log(usersAndMessages);
async function getAllMessages(req, res) {
    try {
        const messages = await Message.findAll()  
        res.status(200).json(messages)  
    } catch (error) {
        console.error('Error al obtener message:', error)  
        res.status(500).json({
            message: 'Error al obtener message',
            error: error.message
        })  
    }
}


async function getOneMessage(req, res) {
    console.log({body: req.body, params: req.params, query: req.query})  //consultar lo que nos llega en la request
    try {
        const message = await Message.findByPk(req.params.id)
        if (!message){ res.status(500).send("Message not found!")}
        res.status(200).json(message)
    } catch (error) {
        res.status(402).send(error.message)
    }
}




async function updateMessage(req, res) {
    try {
        const [ message ] = await Message.update(req.body, {
            where: {id: req.params.id},
            returning: true   // para que me devuelva el mensaje actualiado
        })
        res.status(200).json(message)
    } catch (error) {
        res.status(402).send(error.message)
    }
} 


async function deleteMessage(req, res) {
    try {
        const message = await Message.destroy({
            where: { id: req.params.id },
        })
        res.status(200).json({text: "Message deleted!", message: message})
    } catch (error) {
        res.status(402).send(error.message)
    }
}


module.exports = { getAllMessages, getOneMessage, createMessage, updateMessage, deleteMessage } 