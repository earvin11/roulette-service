import { Module } from '@nestjs/common';
import { WsGateway } from './ws-gateway';
import { BetModule } from 'src/bets/infraestructure/bet.module';
import { RoundModule } from 'src/rounds/infraestructure/round.module';

@Module({
  providers: [WsGateway],
  imports: [
    RoundModule,
    BetModule,
  ],
  exports: [WsGateway],
})
export class WsServerModule {}
