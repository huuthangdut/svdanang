import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

export class UserEmailValidators {

  static unique(userService: UserService, oldEmail?: string) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      return userService.checkEmailAvailability(control.value).pipe(
        debounceTime(500),
        map(response => {
          if (oldEmail && control.value === oldEmail) {
            return null;
          }

          if (!response.success) {
            return { unique: true };
          }
        }));
    }
  }
}

