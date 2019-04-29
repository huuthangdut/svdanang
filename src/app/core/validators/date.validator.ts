import { isSameDay } from 'date-fns';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

export class DateValidators {

  static dateRange(group: AbstractControl): ValidationErrors | null {
    const startTime = group.get('startTime').value;
    const endTime = group.get('endTime').value;

    if (moment(endTime).isBefore(moment(startTime))) {
      return { dateRange: true };
    }

    return null;
  }

  static includeDate(existDates: Date[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (moment(control.value).isValid()) {

        const date = moment(control.value).set({ seconds: 0 });

        const existDatesMoment = existDates.map(d => moment(d)
          .set({ seconds: 0 }));

        return existDatesMoment.some(d => d.isSame(date)) ?
          { includeDate: true } : null;
      }

      return null;
    }
  }
}
