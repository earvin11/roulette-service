import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
import { DateServicePort } from '../domain/date-service.port';

// dayjs.extend(utc); // Extiende Day.js con el plugin UTC

@Injectable()
export class DateServicePortDayJs implements DateServicePort {
    getCurrentDate(format = 'DD-MM-YYYY'): string {
        return dayjs().utc().format(format);
    }
    getCurrentTime(format = 'HH-mm-ss'): string {
        return dayjs().utc().format(format);
    }
    getCurrentDateTime(format = 'DD-MM-YYYY HH-mm-ss'): string {
        return dayjs().utc().format(format);
    }
}