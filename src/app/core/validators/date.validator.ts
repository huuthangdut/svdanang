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
}
