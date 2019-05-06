import { CovalentLoadingModule } from '@covalent/core/loading';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';

@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    DepartmentRoutingModule,
    CovalentLoadingModule
  ],
  entryComponents: [DepartmentFormComponent]
})
export class DepartmentModule { }
