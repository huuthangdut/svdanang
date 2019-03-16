import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/components/login/login.component';
import { MainComponent } from './main.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
}, {
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
    },
    {
      path: 'roles',
      loadChildren: './modules/role/role.module#RoleModule'
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
