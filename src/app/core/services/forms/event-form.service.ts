import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EventFormService {

  validationMessages: any;

  formErrors = {
    name: '',
    topicId: '',
    startTime: '',
    endTime: '',
    location: '',
    expectedQuantity: '',
    fee: '',
    currencyId: ''
  }

  constructor() {
    this.validationMessages = {
      name: {
        required: 'Vui lòng nhập tên sự kiện.'
      },
      topicId: {
        required: 'Vui lòng chọn chủ đề sự kiện.'
      },
      startTime: {
        required: 'Vui lòng chọn ngày bắt đầu.',
        date: 'Ngày không đúng định dạng dd/MM/yyyy.'
      },
      endTime: {
        required: 'Vui lòng chọn ngày kết thúc.',
        date: 'Ngày không đúng định dạng dd/MM/yyyy.'
      },
      location: {
        required: 'Vui lòng nhập địa điểm tổ chức sự kiện.'
      },
      expectedQuantity: {
        required: 'Vui lòng nhập số lượng dự kiến.'
      },
      fee: {
        required: 'Vui lòng nhập phí tham gia.',
      },
      currencyId: {
        required: 'Vui lòng chọn đơn vị tiền tệ.'
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
