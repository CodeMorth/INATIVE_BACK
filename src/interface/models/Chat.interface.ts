import { Model, Optional } from 'sequelize'

export interface ChatAttributesType {
  id_chat: number
}

export type ChatCreationAttributes = Optional<ChatAttributesType, 'id_chat'>

export class ChatType
  extends Model<ChatAttributesType, ChatCreationAttributes>
  implements ChatAttributesType
{
  id_chat!: number
}


export interface ChatDataType {
    id_user_1: number
    id_user_2: number
  }