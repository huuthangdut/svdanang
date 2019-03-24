import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleFormComponent, ChecklistDatabase } from './role-form/role-form.component';
import { RoleService } from '../../core/services/role.service';

@NgModule({
  declarations: [RoleListComponent, RoleFormComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule
  ],
  providers: [
    RoleService
  ]
  ,
  entryComponents: [RoleFormComponent]
})
export class RoleModule { }
