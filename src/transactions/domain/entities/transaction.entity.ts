export interface TransactionEntity {
    type: TypeTransaction;
    roundUuid: string;
    playerUuid: string;
    amount: number;
    betReference: string;
    uuid?: string;
    details?: Record<string, any>;
}

export type TypeTransaction = 'CREDIT' | 'DEBIT' | 'ROLLBACK';