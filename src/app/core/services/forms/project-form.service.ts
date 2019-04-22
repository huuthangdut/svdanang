import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectFormService {
  validationMessages: any;

  formErrors = {
    name: '',
    startTime: '',
    endTime: '',
    dateGroup: '',
    goal: '',
    projectTopicId: '',
  }

  constructor() {
    this.validationMessages = {
      name: {
        required: 'Vui lòng nhập tên dự án.'
      },
      startTime: {
        required: 'Vui lòng nhập ngày bắt đầu.'
      },
      endTime: {
        required: 'Vui lòng nhập ngày kết thúc.'
      },
      dateGroup: {
        dateRange: 'Khoảng thời gian không hợp lệ.'
      },
      goal: {
        required: 'Vui lòng nhập số tiền cần gây quỹ.'
      },
      projectTopicId: {
        required: 'Vui lòng chọn loại dự án.'
      },
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
