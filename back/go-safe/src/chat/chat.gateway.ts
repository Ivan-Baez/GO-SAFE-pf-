import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinUser')
  handleJoinUser(@ConnectedSocket() client: Socket, @MessageBody() user: any) {
    client.join(`user-${user.id}`);
    client.data.user = user;
  }

  @SubscribeMessage('joinAdmin')
  handleJoinAdmin(@ConnectedSocket() client: Socket) {
    client.join('admin');
  }

  @SubscribeMessage('userMessage')
  handleUserMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    const message = {
      content: payload.content,
      user: client.data.user,
    };

    this.server.to('admin').emit('receiveUserMessage', message);
  }

  @SubscribeMessage('adminMessage')
  handleAdminMessage(@MessageBody() payload: any) {
    this.server.to(`user-${payload.userId}`).emit('receiveAdminMessage', {
      content: payload.content,
      admin: true,
    });
  }
}
