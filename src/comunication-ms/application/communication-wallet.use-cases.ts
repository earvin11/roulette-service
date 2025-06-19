import { Injectable } from '@nestjs/common';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { NameEventsMS } from '../domain/enums/name-events.enum';
import { CreditWalletRequest, DebitWalletRequest } from '../domain/interfaces/wallet.interfaces';
import { CommunicationWalletPort } from '../domain/ports/communication-wallet.port';

@Injectable()
export class CommunicationWalletUseCases {
    constructor(
        private readonly communicationWalletPort: CommunicationWalletPort,
    ) {}

    public async debit(operatorId: string, data: DebitWalletRequest) {
        try {
            return await this.communicationWalletPort.subscribe(NameEventsMS.WALLET_DEBIT, { operatorId, data });
        } catch (error) {
            throw error;
        }
    };

    public async credit(operatorId: string, data: CreditWalletRequest) {
        try {
            return await this.communicationWalletPort.subscribe(NameEventsMS.WALLET_CREDIT, { operatorId, data });
        } catch (error) {
           throw error;
        }
    };
}