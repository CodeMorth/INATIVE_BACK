import { Server } from 'socket.io'
import { decodeToken, ErrorOwn } from '../utils'
import { createMessageService, getMessagesByChatIdService } from '../services'
import { CustomSocket, DataCreateMessageSocket } from '../interface/socket'

export const messageSocketController = (io: Server, socket: CustomSocket) => {
  // Función para manejar errores
  const handleError = (error: any, event: string) => {
    console.error(`Error en el evento ${event}:`, error.message)
    socket.emit('error', { message: error.message })
  }

  // Evento para unirse a un chat
  socket.on('joinChat', async ({ id_chat }: { id_chat: string }) => {
    if (!id_chat) {
      return handleError(ErrorOwn('Falta el id del chat'), 'joinChat')
    }

    socket.join(id_chat) // Unir al socket a la sala del chat
    console.log(`Usuario unido a la sala del chat: ${id_chat}`)

    try {
      const messagesChat: any = await getMessagesByChatIdService(id_chat)

      if (!messagesChat || !messagesChat.dataValues) {
        return handleError(
          ErrorOwn('No se encontraron mensajes para el chat'),
          'joinChat'
        )
      }

      // Emitir solo a la sala correspondiente
      socket.emit('message', messagesChat.dataValues.message_x_chats)
    } catch (error) {
      handleError(error, 'joinChat')
    }
  })

  // Evento para enviar un mensaje
  socket.on(
    'message',
    async ({ id_chat, message }: DataCreateMessageSocket) => {
      
      if (!id_chat || !message) {
        return handleError(ErrorOwn('Faltan datos'), 'message')
      }
      const token = socket.handshake.auth.token
      if (!token) {
        return handleError(ErrorOwn('No hay token'), 'message')
      }

      try {
        const dataToken = await decodeToken(token)

        // Crear mensaje
        const messageData = {
          id_chat,
          id_sender_message: dataToken.id_user,
          message: message.message
        }

        await createMessageService(messageData)

        // Obtener mensajes actualizados del chat
        const messagesChat: any = await getMessagesByChatIdService(id_chat)

        if (!messagesChat || !messagesChat.dataValues) {
          return handleError(
            ErrorOwn('No se encontraron mensajes para el chat'),
            'message'
          )
        }

        // Emitir los mensajes actualizados solo a la sala
        io.to(id_chat.toString()).emit(
          'message',
          messagesChat.dataValues.message_x_chats
        )
      } catch (error) {
        handleError(error, 'message')
      }
    }
  )
}
