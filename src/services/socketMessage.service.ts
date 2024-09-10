import InnativeDB from '../config/database'
import { Chat, Message, MessageXChat } from '../models'
import { ErrorOwn } from '../utils/ErrorOwn'

export const createSocketMessageService = async (id_chat:number,id_sender_message:number ,message:string) => {

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
        id_chat: id_chat
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


export const getSocketMessageByChatService = async (id_chat:number) => {
  
    console.log("Llego el id al servicio getSocketMessageByChatService")

    try {
      // Traer todos los mensajes
      const chatWithMessages = await Chat.findOne({
        where: { id_chat: id_chat },
        include: [
          {
            model: Message,
            through: { attributes: [] } // Evitar traer la tabla intermedia
          }
        ]
      });

      console.log("chatWithMessages",chatWithMessages)

      return chatWithMessages
     
    } catch (error) {
      // Revertir la transacción en caso de error
      throw ErrorOwn('No se pudo crear el mensaje')
  
    }
  }
  