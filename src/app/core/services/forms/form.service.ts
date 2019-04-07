import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  logValidationErrors(group: FormGroup, formErrors: any, validationMessages) {
    Object.keys(group.controls).forEach((field: string) => {
      if (formErrors.hasOwnProperty(field)) {
        const abstractControl = group.get(field);

        formErrors[field] = '';
        this.setErrorMessages(abstractControl, formErrors, field, validationMessages);

        if (abstractControl instanceof FormGroup) {
          this.logValidationErrors(abstractControl, formErrors, validationMessages);
        }
      }
    })
  }


  setErrorMessages(control: AbstractControl, errorsObj: any, field: string, validationMessages: any) {
    if (control && control.invalid && (control.touched || control.dirty)) {
      const messages = validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorsObj[field] += messages[key] + ' ';
        }
      }
    }
  }

  markDirty(group: FormGroup): any {
    for (const i in group.controls) {
      if (group.controls.hasOwnProperty(i)) {
        group.controls[i].markAsDirty();
      }
    }
  }

}
