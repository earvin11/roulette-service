import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { envs } from 'src/config/envs';
// import { NameServices } from '../domain/enums/name-services.enum';
// import { QueueNamesMS } from '../domain/enums/name-queues.enum';
import { CommunicationWalletPort } from '../domain/ports/communication-wallet.port';
import { CommunicationWalletRMQ } from './adapters/communication-wallet.rmq';
import { CommunicationWalletUseCases } from '../application/communication-wallet.use-cases';

@Module({
    imports: [
        // ClientsModule.register([
        //     {
        //         name: NameServices.PLAYER_SERVCE,
        //         transport: Transport.RMQ,
        //         options: {
        //             urls: [envs.rabbitMqUrl],
        //             queue: QueueNamesMS.PLAYER_QUEUE,
        //             queueOptions: {
        //                 durable: false
        //             }
        //         }
        //     }
        // ]),
    ],
    providers: [
        CommunicationWalletRMQ,
        CommunicationWalletUseCases,
        {
            provide: CommunicationWalletPort,
            useExisting: CommunicationWalletRMQ
        }
    ],
    exports: [
        CommunicationWalletUseCases,
    ]
})
export class CommunicationMSModule{}