const Message = require('../Models/message.model')

async function getAllMessages(req, res) {
    try {
        const messages = await Message.findAll();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error al obtener message:', error);
        res.status(500).json({
            message: 'Error al obtener message',
            error: error.message
        });
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


async function createMessage(req, res) {
    try {
        const message = await Message.create(req.body);
        res.status(201).json({
            message: "Message created successfully.",
            messageId: message.id
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create message.",
            error: error.message
        });
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