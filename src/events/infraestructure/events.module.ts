import { Module } from '@nestjs/common';
import { EventPublisher } from '../application/event-publisher';
import { EmitteryEventPublisher } from './event-publisher.emittery';

@Module({
  providers: [
    EmitteryEventPublisher,
    {
      provide: EventPublisher,
      useExisting: EmitteryEventPublisher,
    },
  ],
  exports: [EventPublisher],
})
export class EventsModule {}
