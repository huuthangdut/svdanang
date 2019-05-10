import { CovalentLoadingModule } from '@covalent/core/loading';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    CovalentLoadingModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
