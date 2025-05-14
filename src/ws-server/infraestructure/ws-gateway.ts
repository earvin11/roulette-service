import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { SocketEventsEnum } from 'src/shared/enums/socket-events.enum';

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor() {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {}
  handleConnection(client: Socket, ...args: any[]) {}

  emitEvent(event: string, data: any) {
    this.server.emit(event, data);
  }

  @OnEvent(EventsEnum.ROUND_START)
  startRound(payload: any) {
    this.server.emit(SocketEventsEnum.ROUND_START, JSON.stringify(payload));
    return;
  }

  @OnEvent(EventsEnum.ROUND_END)
  endRound() {
    this.server.emit(SocketEventsEnum.ROUND_END);
    return;
  }

  // @OnEvent(EventsEnum.ROUND_BET_TIME)
  // endBetTimeRound(payload: any) {
  //   this.server.emit(SocketEventsEnum.ROUND_BET_TIME, JSON.stringify(payload));
  //   return;
  // }

  // @OnEvent(EventsEnum.ROUND_JACKPOT)
  // endJackpotRound(payload: any) {
  //   this.server.emit(SocketEventsEnum.ROUND_JACKPOT, JSON.stringify(payload));
  //   return;
  // }
}
