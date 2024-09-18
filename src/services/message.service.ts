import InnativeDB from '../config/database'
import { MessageDataType } from '../interface/models'
import { Chat, Message, MessageXChat, User } from '../models'
import { ErrorOwn } from '../utils/ErrorOwn'

export const createMessageService = async (messageData: MessageDataType) => {
  const { message, id_sender_message, id_chat } = messageData

  if (!message || !id_sender_message || !id_chat) throw ErrorOwn('Faltan datos')

  // Utilizar una transacción para asegurar que ambas operaciones se completen o ninguna
  const transaction = await InnativeDB.transaction()

  try {
    // Crear el mensaje
    const newMessage = await Message.create(
      {
        message,
        id_sender_message
      },
      { transaction }
    )

    // Relacionar el mensaje con el chat
    await MessageXChat.create(
      {
        id_message: newMessage.id_message,
        id_chat
      },
      { transaction }
    )

    // Confirmar la transacción
    await transaction.commit()

    return { message: 'Mensaje creado correctamente' }
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback()
    throw ErrorOwn('No se pudo crear el mensaje')
  }
}

export const getMessagesByChatIdService = async (id_chat: string | number) => {
  try {
    // Traer todos los mensajes relacionados con el chat usando la tabla pivote MessageXChat
    const chatWithMessages = await Chat.findOne({
      where: { id_chat: id_chat },
      include: [
        {
          model: MessageXChat, // Incluir la tabla pivote
          include: [
            {
              model: Message, // Incluir el modelo Message a través de la tabla pivote
              include: [
                {
                  model: User, // Incluir el usuario que envió el mensaje
                  attributes: [
                    'id_user',
                    'user_name',
                    'full_name'
                  ]
                }
              ]
            }
          ]
        }
      ]
    })

    if (!chatWithMessages) {
      throw new Error(`No se encontró ningún chat con id_chat ${id_chat}`)
    }

    return chatWithMessages
  } catch (error: any) {
    console.error(
      'Error en getSocketMessageByChatService:',
      error.message || error
    )

    // Lanza un error más específico para el controlador
    throw ErrorOwn(
      `Hubo un problema al extraer los mensajes del chat: ${error.message}`
    )
  }
}
