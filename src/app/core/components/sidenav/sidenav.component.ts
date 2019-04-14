import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core';
import { AuthUser } from '../../models';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  name = "Diễn đàn sinh viên Đà nẵng";

  routes: Object[] = [{
    icon: 'build',
    route: '/',
    title: 'Console',
  }, {
    icon: 'library_books',
    route: '/profile',
    title: 'Trang cá nhân',
  }
  ];
  mgmtmenu: Object[] = [{
    icon: 'people',
    route: '/users',
    title: 'Người dùng',
    description: 'Item description',
  }, {
    icon: 'dns',
    route: '/meetings',
    title: 'Lịch họp',
    description: 'Item description',
  },
  {
    icon: 'dns',
    route: '/posts',
    title: 'Bài đăng',
    description: 'Item description',
  },
  {
    icon: 'dns',
    route: '/events',
    title: 'Sự kiện',
    description: 'Item description',
  },
  {
    icon: 'dns',
    route: '/projects',
    title: 'Dự án gây quỹ',
    description: 'Item description',
  }
  ];
  monitormenu: Object[] = [{
    icon: 'verified_user',
    route: '/roles',
    title: 'Phân quyền',
    description: 'Item description',
  }
  ];
  settingsmenu: Object[] = [
    {
      icon: 'settings',
      route: '.',
      title: 'Cấu hình',
      description: 'Item description',
    }
  ];

  user: any;

  constructor(
    public media: TdMediaService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
      this.user.displayName = user.lastName + " " + user.firstName;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
