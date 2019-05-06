import { ACTION } from './../../../shared/constants/action.constant';

import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TdMediaService } from '@covalent/core';

import { environment } from '../../../../environments/environment';
import { User } from '../../models';
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
      icon: 'payment',
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
      permissions: []
    },
    {
      icon: 'subject',
      route: '/topics',
      title: 'Chủ đề',
      description: 'Item description',
      permissions: []
    },
    {
      icon: 'settings',
      route: '.',
      title: 'Hệ thống',
      description: 'Item description',
      permissions: []
    }
  ];

  USERS

  user: User;
  displayName: string;

  constructor(
    public media: TdMediaService,
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {

    this.userService.getCurrentUser().subscribe(response => {
      if (response.success) {
        this.user = response.data;
        this.displayName = this.user.lastName + " " + this.user.firstName;

        this.iconRegistry.addSvgIconInNamespace('assets', 'avatar',
          this.domSanitizer.bypassSecurityTrustResourceUrl(this.user.avatar));
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
