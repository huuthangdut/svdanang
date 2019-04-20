import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { ChangeDetectorRef } from '@angular/core';

export class UsernameValidators {

  constructor(public changeRef: ChangeDetectorRef) {
    // this.contructor.changeRef = changeRef;
  }

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
        },
          // tap(() => setTimeout(() => UsernameValidators.changeRef.detectChanges(), 0))
        ));
    }
  }


}

