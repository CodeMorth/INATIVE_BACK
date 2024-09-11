import { Server } from 'socket.io'
import { ErrorOwn } from '../utils'
import {
  createMessageService,
  getMessagesByChatIdService
} from '../services'

interface DataCreateMessageSocket {
  id_chat: number
  id_sender_message: number
  message: {message:string}
}

export const messageSocketController = (io: Server, socket: any) => {
  socket.on('joinChat', async ({ id_chat }: any) => {
    if (!id_chat) throw ErrorOwn('Faltan el id del chat')

    socket.join(id_chat)

    try {
      const messagesChat: any = await getMessagesByChatIdService(id_chat)

      socket.emit('message', messagesChat.dataValues.message_x_chats)
    } catch (error) {
      throw ErrorOwn('Hubo un error con el socket de joinChat')
    }
  })

  socket.on(
    'message',
    async ({
      id_chat,
      id_sender_message,
      message
    }: DataCreateMessageSocket) => {

      const messageData = { id_chat, id_sender_message, message:message.message }

      if (!id_chat || !id_sender_message || !message)
        throw ErrorOwn('Faltan datos')

      socket.join(id_chat)

      try {
        await createMessageService(messageData)

        const messagesChat: any = await getMessagesByChatIdService(id_chat)

        io.to(id_chat.toString()).emit(
          'message',
          messagesChat.dataValues.message_x_chats
        )
      } catch (error) {
        throw ErrorOwn('Hubo un error con el socket de message')
      }
    }
  )
}
