const { getAllMessages, getOneMessage, createMessage, updateMessage, deleteMessage, sendMessage, getAllmyMessages, getAllContactsMsg } = require('../Controllers/message.controller')
const { checkAuth } = require('../Middleware')


const router = require('express').Router()

router.get('/mychat/:userId', checkAuth, getAllmyMessages)
router.get('/contacts', checkAuth, getAllContactsMsg)

//  ADMIN
router.get('/', checkAuth, getAllMessages)
router.get('/:id', checkAuth, getOneMessage)
router.post('/send', checkAuth, sendMessage)
router.post('/', checkAuth, createMessage)
router.put('/:id', checkAuth, updateMessage) 
router.delete('/:id', checkAuth, deleteMessage) 
    
module.exports = router