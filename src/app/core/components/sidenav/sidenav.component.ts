import { AuthUser } from './../../models/auth-user.model';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TdMediaService } from '@covalent/core';

import { environment } from '../../../../environments/environment';
import { User } from '../../models';
import { ACTION } from './../../../shared/constants/action.constant';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  PUBLIC_URL = environment.publicURL;

  name = "Diễn đàn sinh viên Đà nẵng";

  miniNav: boolean = false;

  routes: Object[] = [
    {
      icon: 'account_box',
      route: '/profile',
      title: 'Trang cá nhân',
    }
  ];
  mgmtmenu: Object[] = [
    {
      icon: 'people',
      route: '/users',
      title: 'Người dùng',
      description: 'Item description',
      permissions: [ACTION.USER_PAGE]
    },
    {
      icon: 'event_note',
      route: '/meetings',
      title: 'Lịch họp',
      description: 'Item description',
      permissions: [ACTION.MEETING_PAGE]
    },
    {
      icon: 'note_add',
      route: '/posts',
      title: 'Bài viết',
      description: 'Item description',
      permissions: [ACTION.BLOGPOST_PAGE]
    },
    {
      icon: 'event',
      route: '/events',
      title: 'Sự kiện',
      description: 'Item description',
      permissions: [ACTION.EVENT_PAGE]
    },
    {
      icon: 'receipt',
      route: '/projects',
      title: 'Dự án gây quỹ',
      description: 'Item description',
      permissions: [ACTION.PROJECT_PAGE]
    }
  ];
  settingsmenu: Object[] = [
    {
      icon: 'verified_user',
      route: '/roles',
      title: 'Phân quyền',
      description: 'Item description',
      permissions: [ACTION.ROLE_PAGE]
    },
    {
      icon: 'group_work',
      route: '/departments',
      title: 'Ban',
      description: 'Item description',
      permissions: [ACTION.DEPARTMENT_PAGE]
    },
    {
      icon: 'subject',
      route: '/topics',
      title: 'Chủ đề',
      description: 'Item description',
      permissions: [ACTION.TOPIC_PAGE]
    },
    // {
    //   icon: 'settings',
    //   route: '/settings',
    //   title: 'Hệ thống',
    //   description: 'Item description',
    //   permissions: []
    // }
  ];


  user: AuthUser;

  constructor(
    public media: TdMediaService,
    private authService: AuthService,
    private router: Router
  ) {

    this.authService.currentUser.subscribe(response => {
      if (response) {
        this.user = response;
      }

    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToPublicPage() {

  }
}
