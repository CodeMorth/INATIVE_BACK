import { Server as SocketServer } from "socket.io";
import { messageSocketController } from "../controllers/socketMessage.controller";
import { Socket as DefaultSocket } from "socket.io";

// Extiende el tipo Socket de Socket.IO para incluir la propiedad 'user'
interface CustomSocket extends DefaultSocket {
  user?: any; // Define la propiedad user como opcional y de tipo `any` o el tipo específico que necesites
}

export const configureSocket = (serverHttp: any) => {

  const io = new SocketServer(serverHttp, {
    cors: {
      origin: "http://localhost:3000",
    },
    connectionStateRecovery:{}
  });

  io.on("connection", (socket: CustomSocket) => {
    console.log(`Usuario ${socket.id} conectado`);
    
    messageSocketController(io, socket);

    socket.on("disconnect", () => {
      console.log(`Usuario ${socket.id} desconectado`);
    });
  });
};
