import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordFormService {

  validationMessages: any;

  formErrors = {
    oldPassword: '',
    passwordGroup: '',
    password: '',
    confirmPassword: ''
  }

  constructor() {
    this.validationMessages = {
      oldPassword: {
        required: 'Vui lòng nhập mật khẩu cũ.'
      },
      passwordGroup: {
        passwordMismatch: 'Mật khẩu và xác nhận mật khẩu không khớp.'
      },
      password: {
        required: 'Vui lòng nhập mật khẩu mới.'
      },
      confirmPassword: {
        required: 'Vui lòng nhập xác nhận mật khẩu.',
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

  passwordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroup): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && form.get('confirmPassword').touched && form.invalid;
      return controlInvalid || formInvalid;
    }
  }

  confirmErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroup): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && form.get('password').touched && form.invalid;
      return controlInvalid || formInvalid;
    }
  }
}
