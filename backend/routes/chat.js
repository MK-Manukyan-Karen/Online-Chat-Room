import express from 'express'
const router = express.Router()
import { createRoom,getRoomUsersAndMessages } from '../controllers/chat.js'

router.post('/',createRoom) 
router.get('/:roomName',getRoomUsersAndMessages) 


export default router