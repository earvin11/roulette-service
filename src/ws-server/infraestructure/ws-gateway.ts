import { Logger } from '@nestjs/common';
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
import { RoundCacheUseCases, RoundUseCases } from 'src/rounds/application';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { SocketEventsEnum } from 'src/shared/enums/socket-events.enum';
import { getEntityFromCacheOrDb } from 'src/shared/helpers/get-entity-from-cache-or-db.helper';

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private readonly logger = new Logger('WsGateway')

  constructor(
    private readonly betUseCases: BetUseCases,
    private readonly roundUseCases: RoundUseCases,
    private readonly roundCacheUseCases: RoundCacheUseCases
  ) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {}
  handleConnection(client: Socket, ...args: any[]) {}

  emitEvent(event: string, data: any) {
    this.server.emit(event, data);
  }

  //TODO: betEvent
  @SubscribeMessage('BET')
  async handleBet(@MessageBody() data: any) {

    const round = await getEntityFromCacheOrDb(
      () => this.roundCacheUseCases.findByUuid(data.roundUuid),
      () => this.roundUseCases.findByUuid(data.roundUuid),
      (roundDb) => this.roundCacheUseCases.save(roundDb)
    );

    this.logger.log({ round })
    //TODO: validaciones de ronda
    // if(!round) return;
    // if(!round.open) return;

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
