import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NameServices } from 'src/comunication-ms/domain/enums/name-services.enum';
import { CommunicationWalletPort } from 'src/comunication-ms/domain/ports/communication-wallet.port';

export class CommunicationWalletRMQ implements CommunicationWalletPort {
    constructor(
        @Inject(NameServices.PLAYER_SERVCE)
        private readonly client: ClientProxy
    ) {}

    publish<T>(channel: string, message: T): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async subscribe<T>(channel: string, data: any): Promise<void> {
        try {
            const response = await lastValueFrom(
                this.client.send(channel, data) // ¡Mismo patrón!
            );
            return response;
        } catch (error) {
            throw new HttpException(
                'Order processing failed', 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}