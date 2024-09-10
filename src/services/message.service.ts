import InnativeDB from '../config/database'
import { MessageDataType } from '../interface/models'
import { Message, MessageXChat } from '../models'
import { ErrorOwn } from '../utils/ErrorOwn'

export const createMessageService = async (messageData: MessageDataType) => {
  const { message, id_sender_message, chatId } = messageData

  if (!message || !id_sender_message || !chatId) throw ErrorOwn('Faltan datos')

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
        id_chat: chatId
      },
      { transaction }
    )

    // Confirmar la transacción
    await transaction.commit()

    return newMessage
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback()
    throw ErrorOwn('No se pudo crear el mensaje')

  }
}
