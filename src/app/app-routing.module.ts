import { UploadImageComponent } from './shared/components/upload-image/upload-image.component';
import { AuthGuard } from './core/guards/auth.guard';
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
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
    },
    {
      path: 'roles',
      loadChildren: './modules/role/role.module#RoleModule'
    },
    {
      path: 'users',
      loadChildren: './modules/user/user.module#UserModule'
    },
    {
      path: 'profile',
      loadChildren: './modules/profile/profile.module#ProfileModule'
    },
    {
      path: 'posts',
      loadChildren: './modules/blog-post/blog-post.module#BlogPostModule'
    },
    {
      path: 'events',
      loadChildren: './modules/event/event.module#EventModule'
    },
    {
      path: 'meetings',
      loadChildren: './modules/meeting/meeting.module#MeetingModule'
    },
    {
      path: 'projects',
      loadChildren: './modules/project/project.module#ProjectModule'
    },
    {
      path: 'file',
      component: UploadImageComponent
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
