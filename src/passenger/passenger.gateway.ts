import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { SOCKET_EVENTS, SOCKET_NAMESPACES } from '../shared/constant';

@WebSocketGateway({ namespace: SOCKET_NAMESPACES.PASSENGER })
export class PassengerGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;
  private readonly logger: Logger = new Logger('PassengerGateway');

  afterInit(server: Server) {
    this.logger.log('Connection Initialize');
  }

  @SubscribeMessage(SOCKET_EVENTS.SEND_MESSAGE)
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ) {
    this.wss.to(message.room).emit(SOCKET_EVENTS.SEND_MESSAGE, message);
  }

  @SubscribeMessage(SOCKET_EVENTS.JOIN_ROOM)
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    client.emit(SOCKET_EVENTS.JOIN_ROOM, room);
  }

  @SubscribeMessage(SOCKET_EVENTS.LEAVE_ROOM)
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit(SOCKET_EVENTS.LEAVE_ROOM, room);
  }
}
