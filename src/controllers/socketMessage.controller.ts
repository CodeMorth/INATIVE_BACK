import { Server } from 'socket.io'
import { ErrorOwn } from '../utils'
import {
  createSocketMessageService,
  getSocketMessageByChatService
} from '../services'

export const messageSocketController = (io: Server, socket: any) => {
  socket.on('joinChat', async ({ id_chat }: any) => {
    
    if (!id_chat) throw ErrorOwn('Faltan el id del chat')

    socket.join(id_chat)

    try {

      const messagesChat:any = await getSocketMessageByChatService(id_chat)

      socket.emit('message', messagesChat.messages)

    } catch (error) {
      throw ErrorOwn('Hubo un error con el socket de joinChat')
    }
  })

  socket.on('message', async ({ id_chat, id_sender_message, message }: any) => {
      
      if (!id_chat || !id_sender_message || !message)
        throw ErrorOwn('Faltan datos')
    
    socket.join(id_chat)

    try {
      await createSocketMessageService(id_chat, id_sender_message, message.message)

      const messagesChat:any = await getSocketMessageByChatService(id_chat)

      io.to(id_chat).emit('message', messagesChat.messages)
    } catch (error) {
        throw ErrorOwn('Hubo un error con el socket de message')

    }
  })
}
