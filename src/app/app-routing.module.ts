import { UploadImageComponent } from './shared/components/upload-image/upload-image.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/components/login/login.component';
import { MainComponent } from './main.component';
import { ACTION } from './shared/constants/action.constant';

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
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
      canActivate: [AuthGuard],
    },
    {
      path: 'roles',
      loadChildren: './modules/role/role.module#RoleModule',
      canActivate: [AuthGuard],
      data: { permissions: [ACTION.ROLE_PAGE] }
    },
    {
      path: 'users',
      loadChildren: './modules/user/user.module#UserModule',
      canActivate: [AuthGuard],
      data: { permissions: [ACTION.USER_PAGE] }
    },
    {
      path: 'profile',
      loadChildren: './modules/profile/profile.module#ProfileModule',
      canActivate: [AuthGuard],
      data: { permissions: [] }
    },
    {
      path: 'posts',
      loadChildren: './modules/blog-post/blog-post.module#BlogPostModule',
      canActivate: [AuthGuard],
      data: { permissions: [ACTION.BLOGPOST_PAGE] }
    },
    {
      path: 'events',
      loadChildren: './modules/event/event.module#EventModule',
      canActivate: [AuthGuard],
      data: { permissions: [ACTION.EVENT_PAGE] }
    },
    {
      path: 'meetings',
      loadChildren: './modules/meeting/meeting.module#MeetingModule',
      canActivate: [AuthGuard],
      data: { permissions: [ACTION.MEETING_PAGE] }
    },
    {
      path: 'projects',
      loadChildren: './modules/project/project.module#ProjectModule',
      canActivate: [AuthGuard],
      data: { permissions: [ACTION.PROJECT_PAGE] }
    },
    {
      path: 'topics',
      loadChildren: './modules/topic/topic.module#TopicModule',
      canActivate: [AuthGuard],
      data: { permissions: [ACTION.TOPIC_PAGE] }
    },
    {
      path: 'departments',
      loadChildren: './modules/department/department.module#DepartmentModule',
      canActivate: [AuthGuard],
      data: { permissions: [ACTION.DEPARTMENT_PAGE] }
    }
  ],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
