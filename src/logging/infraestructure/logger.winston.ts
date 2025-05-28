import { Injectable, Logger } from '@nestjs/common';
import { LoggerPort } from '../domain/logger.port';

@Injectable()
export class LoggerWinston implements LoggerPort {
    private readonly logger = new Logger('AppLogger');

    error(message: string, trace?: string, context?: string): void {
        this.logger.error(message, trace, context);
    }
}