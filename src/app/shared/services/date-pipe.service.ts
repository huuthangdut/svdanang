import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatePipeService {

  constructor() { }

  toUnixTimestamp(value): number | null {
    if (moment(value).isValid()) {
      return +moment(value);
    }

    return null;
  }

  fromUnixTimeStamp(value: number): Date | null {
    if (moment(value).isValid()) {
      return moment(value).toDate();
    }

    return null;
  }

  extractTime(value: number): string {
    if (moment(value).isValid()) {
      return moment(value).format('HH:mm:ss');

    }

    return null;
  }

  resetTime(value): any {
    if (moment(value).isValid()) {
      return moment(value).set({
        hour: 0,
        minute: 0,
        second: 0
      });
    }

    return value;
  }

  setDate(dateTime: any, day: any) {
    day = moment(day);
    return moment(dateTime).set({
      day: day.get('day'),
      month: day.get('month'),
      year: day.get('year')
    })
  }
}
