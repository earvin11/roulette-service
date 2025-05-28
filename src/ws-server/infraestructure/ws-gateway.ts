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
import { BetQueueService } from 'src/bets/infraestructure/queues/bets-queue.service';
import { RoundCacheUseCases, RoundUseCases } from 'src/rounds/application';
import { EventsEnum } from 'src/shared/enums/events.enum';
import { SocketEventsEnum } from 'src/shared/enums/socket-events.enum';
import { getEntityFromCacheOrDb } from 'src/shared/helpers/get-entity-from-cache-or-db.helper';
import { envs } from 'src/config/envs';
@WebSocketGateway({
  path: envs.pathWs,
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger('WsGateway');

  constructor(
    private readonly roundUseCases: RoundUseCases,
    private readonly roundCacheUseCases: RoundCacheUseCases,
    private readonly betsQueueService: BetQueueService,
  ) {
    this.logger.log(envs.pathWs);
  }
  
  @WebSocketServer()
  server: Server;
  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('NEW CLIENT CONECTED');    
  }
  handleDisconnect(client: any) {
    this.logger.log('CLIENT DISCONECTED');    
  }

  emitEvent(event: string, data: any) {
    this.server.emit(event, data);
  }

  //TODO: betEvent
  @SubscribeMessage(SocketEventsEnum.BET)
  async handleBet(@MessageBody() data: any) {
    const round = await getEntityFromCacheOrDb(
      () => this.roundCacheUseCases.findByUuid(data.round),
      () => this.roundUseCases.findByUuid(data.round),
      (roundDb) => this.roundCacheUseCases.save(roundDb),
    );

    // Validaciones de ronda
    if (!round) {
      this.server.emit(SocketEventsEnum.BET_ERROR, {
        error: 'Round not found',
      });
      return;
    }
    if (!round.open) {
      this.server.emit(SocketEventsEnum.BET_ERROR, {
        error: 'Round closed',
      });
      return;
    }

    // await this.createBetsUseCase.processBet(data);
    await this.betsQueueService.createBet(data);
    this.server.emit(SocketEventsEnum.BET_SUCCESS, {
      msg: 'Success',
      // TODO: traer data de balance
      userBalance: 1
    });
    return;
  }

  // @SubscribeMessage(SocketEventsEnum.WINNER)
  // winner(playerId: string, roundUuid: string) {

  // }

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
