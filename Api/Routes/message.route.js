const { getAllMessages, getOneMessage, createMessage, updateMessage, deleteMessage } = require('../Controllers/message.controller')


const router = require('express').Router()

router.get('/', getAllMessages)
router.get('/:id', getOneMessage)
router.post('/', createMessage)
router.put('/:id', updateMessage) 
router.delete('/:id', deleteMessage) 
    
module.exports = router