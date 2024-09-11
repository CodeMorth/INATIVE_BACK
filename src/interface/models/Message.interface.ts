import { Model, Optional } from 'sequelize'

// Define la interfaz de atributos del modelo
export interface MessageAttributesType {
  id_message: number
  message: string
  id_sender_message: number
  message_status: 'sent' | 'received' | 'read'
}

// Define un tipo que permita omitir atributos opcionales en la creación
export type MessageCreationAttributesType = Optional<
  MessageAttributesType,
  'id_message' | 'message_status'
>

// Define el modelo MessageType
export class MessageType
  extends Model<MessageAttributesType, MessageCreationAttributesType>
  implements MessageAttributesType
{
  id_message!: number
  message!: string
  id_sender_message!: number
  message_status!: 'sent' | 'received' | 'read'
}

export interface MessageDataType {
  message: string
  id_sender_message: number
  id_chat: number
}
