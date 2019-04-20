import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BlogPostFormService {

  validationMessages: any;

  formErrors = {
    title: '',
    topicId: '',
    shortContent: ''
  }

  constructor() {
    this.validationMessages = {
      title: {
        required: 'Vui lòng nhập tiêu đề bài đăng.'
      },
      topicId: {
        required: 'Vui lòng chọn chủ đề bài đăng.'
      },
      shortContent: {
        required: 'Vui lòng nhập mô tả ngắn.',
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
