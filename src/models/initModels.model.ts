import {
  Chat,
  Friend,
  Language,
  Message,
  MessageXChat,
  User,
  UserXChat,
  UserXFriend,
  UserxLanguage
} from '.'

export const initModels = () => {
  // User and Friend association through user_x_friend
  User.belongsToMany(Friend, { through: UserXFriend, foreignKey: 'id_user' })
  Friend.belongsToMany(User, { through: UserXFriend, foreignKey: 'id_friend' })

  // User and Language association through user_x_language
  User.belongsToMany(Language, {
    through: UserxLanguage,
    foreignKey: 'id_user'
  })
  Language.belongsToMany(User, {
    through: UserxLanguage,
    foreignKey: 'id_language'
  })

  // User and Message association through user_x_message
  // Un usuario puede enviar muchos mensajes
  User.hasMany(Message, { foreignKey: 'id_sender_message' })
  // Un mensaje tiene un único remitente (usuario)
  Message.belongsTo(User, { foreignKey: 'id_sender_message' })

  /*-----------------------UserXChat Special-----------------------*/

  // User and Chat association through user_x_chat

  UserXChat.belongsTo(User, { foreignKey: 'id_user' })
  UserXChat.belongsTo(Chat, { foreignKey: 'id_chat' })

  User.hasMany(UserXChat, { foreignKey: 'id_user' })
  Chat.hasMany(UserXChat, { foreignKey: 'id_chat' })

  /*-----------------------UserXChat Special-----------------------*/

  /*-----------------------MessageXChat Special-----------------------*/

  // Message and Chat association through message_x_chat

  MessageXChat.belongsTo(Message, { foreignKey: 'id_message' })
  MessageXChat.belongsTo(Chat, { foreignKey: 'id_chat' })

  Message.hasMany(MessageXChat, { foreignKey: 'id_message' })
  Chat.hasMany(MessageXChat, { foreignKey: 'id_chat' })

  /*-----------------------MessageXChat Special-----------------------*/
}
