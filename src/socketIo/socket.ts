import { Socket, Server as SocketServer } from 'socket.io'
import { messageSocketController } from '../controllers/socketMessage.controller'

export const configureSocket = (serverHttp: any) => {
  const io = new SocketServer(serverHttp, {
    cors: {
      origin: 'http://localhost:3000'
    }
  })

  io.on('connection', (socket:Socket) => {
    console.log(`User ${socket.id} connected`)

    socket.emit('initial_response', 'Need id')

    // Se delega la lógica de mensajes al controlador
    messageSocketController(io, socket)

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`)
    })
  })
}