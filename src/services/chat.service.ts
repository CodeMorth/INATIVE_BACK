import InnativeDB from '../config/database'
import { ChatData } from '../interface/models/Chat.interface'
import { Chat, UserXChat } from '../models'
import { ErrorOwn } from '../utils/ErrorOwn'

export const createChatService = async (chatData: ChatData) => {
  const transaction = await InnativeDB.transaction()
  const { id_user_1, id_user_2 } = chatData

  try {
    // Validar la entrada
    if (!id_user_1 || !id_user_2) throw ErrorOwn('Faltan datos')

    // Crear el nuevo chat
    const newChat = await Chat.create({}, { transaction })

    // Asociar los usuarios con el chat
    await UserXChat.create(
      {
        id_user: id_user_1,
        id_chat: newChat.id_chat
      },
      { transaction }
    )

    await UserXChat.create(
      {
        id_user: id_user_2,
        id_chat: newChat.id_chat
      },
      { transaction }
    )

    // Confirmar la transacción
    await transaction.commit()

    return newChat
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback()
    throw ErrorOwn('Hubo un problema en la creacion del chat')

  }
}
