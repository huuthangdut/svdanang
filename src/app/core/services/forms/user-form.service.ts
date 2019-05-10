import { FormGroup, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  validationMessages: any;

  minLengthPassword = 6;

  formErrors = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    passwordGroup: '',
    password: '',
    confirmPassword: '',
    roles: ''
  }

  constructor() {
    this.validationMessages = {
      firstName: {
        required: 'Vui lòng nhập tên.'
      },
      lastName: {
        required: 'Vui lòng nhập họ và tên đệm.'
      },
      userName: {
        required: 'Vui lòng nhập tên đăng nhập.',
        unique: 'Tên đăng nhập đã có người sử dụng.'
      },
      email: {
        required: 'Vui lòng nhập địa chỉ email.',
        email: 'Địa chỉ email không hợp lệ.',
        unique: 'Địa chỉ email đã có người sử dụng.'
      },
      passwordGroup: {
        passwordMismatch: 'Mật khẩu và xác nhận mật khẩu không khớp.'
      },
      password: {
        required: 'Vui lòng nhập mật khẩu.',
        minlength: 'Vui lòng nhập mật khẩu tối thiểu ' + this.minLengthPassword + ' kí tự.'
      },
      confirmPassword: {
        required: 'Vui lòng nhập xác nhận mật khẩu.',
        minlength: 'Mật khẩu xác nhận tối thiểu ' + this.minLengthPassword + ' kí tự.'
      },
      roles: {
        required: 'Vui lòng chọn vai trò người dùng.'
      }
    }
  }

  logValidationErrors(group: FormGroup) {
    // for (const field in this.formErrors) {
    //   if (this.formErrors.hasOwnProperty(field)) {
    //     this.formErrors[field] = '';
    //     this.setErrorMessages(group.get(field), this.formErrors, field);
    //   }
    // }


    Object.keys(group.controls).forEach((field: string) => {
      if (this.formErrors.hasOwnProperty(field)) {
        const abstractControl = group.get(field);

        this.formErrors[field] = '';
        this.setErrorMessages(abstractControl, this.formErrors, field);

        if (abstractControl instanceof FormGroup) {
          this.logValidationErrors(abstractControl);
        }
      }


      // this.formErrors[key] = '';
      // if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
      //   const messages = this.validationMessages[key];
      //   for (const errorKey in abstractControl.errors) {
      //     if (abstractControl.errors.h) {
      //       this.formErrors[key] += messages[errorKey] + ' ';
      //     }
      //   }
      // }


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
