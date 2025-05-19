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
import { BetUseCases } from 'src/bets/application/bet.use-cases';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { SocketEventsEnum } from 'src/shared/enums/socket-events.enum';

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly betUseCases: BetUseCases
  ) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {}
  handleConnection(client: Socket, ...args: any[]) {}

  emitEvent(event: string, data: any) {
    this.server.emit(event, data);
  }

  //TODO: betEvent
  @SubscribeMessage('bets')
  async handleBet(@MessageBody() data: any) {
    return await this.betUseCases.processBet(data);
  }

  @OnEvent(EventsEnum.ROUND_START)
  startRound(payload: any) {
    this.server.emit(SocketEventsEnum.ROUND_START, JSON.stringify(payload));
    return;
  }

  @OnEvent(EventsEnum.ROUND_END)
  endRound(payload: any) {
    this.server.emit(SocketEventsEnum.ROUND_END, JSON.stringify(payload));
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
