import { Socket as DefaultSocket } from 'socket.io'
export interface DataCreateMessageSocket {
  id_chat: number
  id_sender_message: number
  message: { message: string }
}

// Extiende el tipo Socket de Socket.IO para incluir la propiedad 'user'
export interface CustomSocket extends DefaultSocket {
  user?: any // Define la propiedad user como opcional y de tipo `any` o el tipo específico que necesites
}
