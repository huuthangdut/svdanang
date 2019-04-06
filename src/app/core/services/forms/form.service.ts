import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(public validationMessages) {

  }

  setErrorMessages(control: AbstractControl, errorsObj: any, field: string) {
    if (control && (control.dirty || control.touched) && control.invalid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorsObj[field] += messages[key] + ' ';
        }
      }
    }
  };

}
