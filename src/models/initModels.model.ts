import {
  Chat,
  ChatMember,
  ChatXChatMember,
  EnglishLevel,
  EnglishlevelXMett,
  EnglishlevelXUser,
  Friend,
  Gender,
  GenderXChat,
  GenderXMeet,
  Language,
  Meet,
  MeetXLanguage,
  MeetXMembermeet,
  Objective,
  User,
  UserXChat,
  UserXFriend,
  UserxLanguage,
  UserXMeet,
  UserXObjective
} from '.'
import { MemberMeet } from './member_meet.model'

export const initModels = () => {
  // User and Meet association through user_x_meet
  User.belongsToMany(Meet, { through: UserXMeet, foreignKey: 'id_user' })
  Meet.belongsToMany(User, { through: UserXMeet, foreignKey: 'id_meet' })

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

  // Chat and ChatMember association through chat_x_chat_members
  Chat.belongsToMany(ChatMember, {
    through: ChatXChatMember,
    foreignKey: 'id_chat'
  })
  ChatMember.belongsToMany(Chat, {
    through: ChatXChatMember,
    foreignKey: 'id_chat_member'
  })

  // Meet and MemberMeet association through meet_x_member_meet
  Meet.belongsToMany(MemberMeet, {
    through: MeetXMembermeet,
    foreignKey: 'id_meet'
  })
  MemberMeet.belongsToMany(Meet, {
    through: MeetXMembermeet,
    foreignKey: 'id_member_meet'
  })

  // Meet and Language association through meet_x_language
  Meet.belongsToMany(Language, {
    through: MeetXLanguage,
    foreignKey: 'id_meet'
  })
  Language.belongsToMany(Meet, {
    through: MeetXLanguage,
    foreignKey: 'id_language'
  })

  // EnglishLevel and User association through english_level_x_user
  EnglishLevel.belongsToMany(User, {
    through: EnglishlevelXUser,
    foreignKey: 'id_english_level'
  })
  User.belongsToMany(EnglishLevel, {
    through: EnglishlevelXUser,
    foreignKey: 'id_user'
  })

  // EnglishLevel and Meet association through english_level_x_meet
  EnglishLevel.belongsToMany(Meet, {
    through: EnglishlevelXMett,
    foreignKey: 'id_english_level'
  })
  Meet.belongsToMany(EnglishLevel, {
    through: EnglishlevelXMett,
    foreignKey: 'id_meet'
  })

  // Gender and Meet association through gender_x_meet
  Gender.belongsToMany(Meet, { through: GenderXMeet, foreignKey: 'id_gender' })
  Meet.belongsToMany(Gender, { through: GenderXMeet, foreignKey: 'id_meet' })

  // Gender and User association through gender_x_user
  // Un género puede tener muchos usuarios
  Gender.hasMany(User, { foreignKey: 'id_gender' })
  // Un usuario pertenece a un solo género
  User.belongsTo(Gender, { foreignKey: 'id_gender' })

  // Gender and Chat association through gender_x_chat
  Gender.belongsToMany(Chat, { through: GenderXChat, foreignKey: 'id_gender' })
  Chat.belongsToMany(Gender, { through: GenderXChat, foreignKey: 'id_chat' })
}
