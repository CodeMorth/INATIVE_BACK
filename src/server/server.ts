import { app } from '../app'
import InnativeDB from '../config/database'
import { Chat, initModels, Message, User } from '../models'
import dotenv from 'dotenv'
import { Server as SocketServer } from 'socket.io'
import http from 'http'

dotenv.config()

initModels()

InnativeDB.sync().then(() => console.log('Data Base conected'))

const PORT = process.env.PORT ?? 8000

const serverHttp = http.createServer(app)
export const io = new SocketServer(serverHttp, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`)

  socket.on('joinChat', async ({ id_chat }) => {
    if (!id_chat) {
      console.error('No chat ID provided')
      return
    }

    socket.join(id_chat)
    
    console.log(`User ${socket.id} joined chat ${id_chat}`)

    // Cargar mensajes anteriores del chat
    try {
      const messages:any = await Message.findAll({
        include: [
          {
            model: Chat,
            through: {
              attributes: []
            },
            where: { id_chat: id_chat }
          },
          {
            model: User, // Incluye el modelo User
            attributes: ['id_user', 'user_name'] // Ajusta los atributos según tus necesidades
          }
        ],
        order: [['createdAt', 'ASC']]
      });

      const finalData = messages.map((item:any) => ({message:item.dataValues.message,id_sender_message: item.dataValues.user.dataValues.user_name}))
      socket.emit('message', finalData)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  })

  socket.on('message', async ({ id_chat, body }) => {
    if (!id_chat) {
      console.error('No chat ID provided in message event')
      return
    }

    try {
      const message = await Message.create({
        id_chat,
        body
      })

      io.to(id_chat).emit('message', message)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  })

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`)
  })
})

serverHttp.listen(PORT)
