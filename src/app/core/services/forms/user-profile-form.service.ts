import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserProfileFormService {
  validationMessages: any;

  formErrors = {
    firstName: '',
    lastName: '',
    email: ''
  }

  constructor() {
    this.validationMessages = {
      firstName: {
        required: 'Vui lòng nhập tên.'
      },
      lastName: {
        required: 'Vui lòng nhập họ và tên đệm.'
      },
      email: {
        required: 'Vui lòng nhập địa chỉ email.',
        email: 'Địa chỉ email không hợp lệ.',
        unique: 'Địa chỉ email đã có người sử dụng.'
      }
    }
  }

  logValidationErrors(group: FormGroup) {
    Object.keys(group.controls).forEach((field: string) => {
      if (this.formErrors.hasOwnProperty(field)) {
        const abstractControl = group.get(field);

        this.formErrors[field] = '';
        this.setErrorMessages(abstractControl, this.formErrors, field);

        if (abstractControl instanceof FormGroup) {
          this.logValidationErrors(abstractControl);
        }
      }
    })
  }

  setErrorMessages(control: AbstractControl, errorsObj: any, field: string) {
    if (control && control.invalid && (control.touched || control.dirty)) {
      const messages = this.validationMessages[field];
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