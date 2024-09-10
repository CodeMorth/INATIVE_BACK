import { Model, Optional } from 'sequelize'

export interface ChatAttributes {
  id_chat: number
}

export type ChatCreationAttributes = Optional<ChatAttributes, 'id_chat'>

export class ChatType
  extends Model<ChatAttributes, ChatCreationAttributes>
  implements ChatAttributes
{
  id_chat!: number
}


export interface ChatData {
    id_user_1: number
    id_user_2: number
  }