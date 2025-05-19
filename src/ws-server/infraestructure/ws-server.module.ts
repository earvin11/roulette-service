import { Module } from '@nestjs/common';
import { WsGateway } from './ws-gateway';
import { BetModule } from 'src/bets/infraestructure/bet.module';

@Module({
  providers: [WsGateway],
  imports: [
    BetModule,
  ],
  exports: [WsGateway],
})
export class WsServerModule {}
