import { AbstractControl, ValidationErrors } from '@angular/forms';
import moment from 'moment';

export class DateValidators {

  static date(control: AbstractControl): ValidationErrors | null {
    if (control && control.value && !moment(control.value, 'dd/mm/yyyy', true).isValid()) {
      return { 'date': true };
    }
    return null;
  }
}
