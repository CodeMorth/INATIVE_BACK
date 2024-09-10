import {
  Chat,
  EnglishLevel,
  EnglishlevelXUser,
  Friend,
  Gender,
  GenderXChat,
  Language,
  Message,
  MessageXChat,
  Objective,
  User,
  UserXChat,
  UserXFriend,
  UserxLanguage,
  UserXObjective
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

  // User and Objective association through user_x_objectives
  User.belongsToMany(Objective, {
    through: UserXObjective,
    foreignKey: 'id_user'
  })
  Objective.belongsToMany(User, {
    through: UserXObjective,
    foreignKey: 'id_objective'
  })

  // User and Chat association through user_x_chat
  User.belongsToMany(Chat, { through: UserXChat, foreignKey: 'id_user' })
  Chat.belongsToMany(User, { through: UserXChat, foreignKey: 'id_chat' })

  // EnglishLevel and User association through english_level_x_user
  EnglishLevel.belongsToMany(User, {
    through: EnglishlevelXUser,
    foreignKey: 'id_english_level'
  })
  User.belongsToMany(EnglishLevel, {
    through: EnglishlevelXUser,
    foreignKey: 'id_user'
  })

  // Gender and User association through gender_x_user
  User.belongsTo(Gender, { foreignKey: 'id_gender' })
  Gender.hasMany(User, { foreignKey: 'id_gender' })

  // Gender and Chat association through gender_x_chat
  Gender.belongsToMany(Chat, { through: GenderXChat, foreignKey: 'id_gender' })
  Chat.belongsToMany(Gender, { through: GenderXChat, foreignKey: 'id_chat' })

  // Message and Chat association through message_x_chat
  Message.belongsToMany(Chat, {
    through: MessageXChat,
    foreignKey: 'id_message'
  })
  Chat.belongsToMany(Message, { through: MessageXChat, foreignKey: 'id_chat' })

  // User and Message association through user_x_message
  // Un usuario puede enviar muchos mensajes
  User.hasMany(Message, { foreignKey: 'id_sender_message' })
  // Un mensaje tiene un único remitente (usuario)
  Message.belongsTo(User, { foreignKey: 'id_sender_message' })
}
