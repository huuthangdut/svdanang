import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { UserService } from '../services/user.service';

export class UsernameValidators {

  static unique(userService: UserService, oldUsername?: string) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService.checkUsernameAvailability(control.value).pipe(
        debounceTime(500),
        map(response => {
          if (oldUsername && control.value === oldUsername) {
            return null;
          }
          if (!response.success) {
            return { unique: true };
          }
        }));
    }
  }
}

