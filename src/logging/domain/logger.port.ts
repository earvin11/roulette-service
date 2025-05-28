export abstract class LoggerPort {
    abstract error(message: string, trace?: string, context?: string): void;
};