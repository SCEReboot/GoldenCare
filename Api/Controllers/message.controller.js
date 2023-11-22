const Message = require('../Models/message.model')
const User = require('../Models/user.model')

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

async function createMessage(req, res) {
    try {
        const message = await Message.create(req.body)  
        res.status(201).json({
            message: "Message created successfully.",
            messageId: message.id
        })  
    } catch (error) {
        res.status(400).json({
            message: "Failed to create message.",
            error: error.message
        })  
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


async function sendMessage(req, res) {
    try {
        const sender = await User.findByPk(res.locals.user.id)    
        const receiver = await User.findByPk(req.body.receiverId)
        
        if (!sender || !receiver) {
            throw new Error('Sender or receiver not found')
        }
        req.body.senderId = res.locals.user.id
        const message = await Message.create(req.body)
      
        res.status(200).json({text: "Message sent!"})

    } catch (error) {
        console.error(error)
        throw new Error('Error al enviar el mensaje')
    }
}


async function getAllmyMessages(req,res) {
  try {
    const sender = await User.findByPk(res.locals.user.id)
    const receiver = await User.findByPk(req.params.userId)

    const senderMessages = await sender.getReceiver({
        where: { id: receiver.id }
    })
    const receiverMessages = await receiver.getReceiver({
        where: { id: sender.id }
    })

    const messages = [...senderMessages, ...receiverMessages] 

    return res.status(200).json(messages)

  } catch (error) {
    res.status(402).send(error.message)
  }
}



// obtener todos los usuarios con los que el usuario actual ha tenido intercambios de mensajes
async function getAllContactsMsg(req,res) {
    try {
      const sender = await User.findByPk(res.locals.user.id)
    
      const senderMessages = await Message.findAll({
        where: { senderId: sender.id}
      })
      const receiverMessages = await Message.findAll({
        where: { receiverId: sender.id}
      })
  
      const messages = [...senderMessages, ...receiverMessages] 
  
      const users = messages.map((message) => {
        if (message.senderId === sender.id) {
          return message.receiverId
        } else {
          return message.senderId
        }
      })
      let result = [...new Set(users)];

      return res.status(200).json(result)
  
    } catch (error) {
      res.status(402).send(error.message)
    }
  }

module.exports = { getAllMessages, getOneMessage, createMessage, updateMessage, deleteMessage ,sendMessage, getAllmyMessages, getAllContactsMsg } 