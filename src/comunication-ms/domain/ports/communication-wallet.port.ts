export abstract class CommunicationWalletPort {
    abstract publish<T>(channel: string, message: T): Promise<void>;
    abstract subscribe<T>(channel: string, data: any): Promise<void>;
}