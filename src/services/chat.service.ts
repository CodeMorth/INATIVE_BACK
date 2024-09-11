import InnativeDB from '../config/database'
import { ChatDataType } from '../interface/models/Chat.interface'
import { Chat, Message, MessageXChat, User, UserXChat } from '../models'
import { ErrorOwn } from '../utils/ErrorOwn'

export const getChatsByUserIdService = async (id_user: string) => {
  if (!id_user) throw new Error('Faltan datos')

  try {
    const chatsWithLastMessage = await Chat.findAll({
      include: [
        {
          model: UserXChat,
          where: { id_user }, // Verificamos que id_user pertenezca a UserXChat
          attributes: ['id_user']
        },
        {
          model: MessageXChat,
          include: [
            {
              model: Message,
              attributes: ['id_message', 'message', 'createdAt'],
              include: [
                {
                  model: User,
                  attributes: ['id_user', 'user_name', 'full_name']
                }
              ]
            }
          ],
          limit: 1
        }
      ]
    })

    if (!chatsWithLastMessage) {
      throw new Error('No se encontraron chats para este usuario')
    }

    console.log("chatsWithLastMessage",chatsWithLastMessage)

    return chatsWithLastMessage
  } catch (error) {
    console.error(error)
    throw new Error('Hubo un problema al obtener los chats del usuario')
  }
}

export const createChatService = async (chatData: ChatDataType) => {
  const transaction = await InnativeDB.transaction()
  const { id_user_1, id_user_2 } = chatData

  // Validar la entrada
  if (!id_user_1 || !id_user_2) throw ErrorOwn('Faltan datos')

  try {
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
