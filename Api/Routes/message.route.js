const { getAllMessages, getOneMessage, createMessage, updateMessage, deleteMessage } = require('../Controllers/message.controller')
const { checkAuth } = require('../Middleware')


const router = require('express').Router()

router.get('/', checkAuth, getAllMessages)
router.get('/:id', checkAuth, getOneMessage)
router.post('/', checkAuth, createMessage)
router.put('/:id', checkAuth, updateMessage) 
router.delete('/:id', checkAuth, deleteMessage) 
    
module.exports = router