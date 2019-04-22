import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { CovalentLoadingModule } from '@covalent/core/loading';

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    CovalentLoadingModule
  ],
  entryComponents: [
    UserFormComponent
  ]
})
export class UserModule { }
