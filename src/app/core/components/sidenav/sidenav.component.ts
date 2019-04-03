import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TdMediaService } from '@covalent/core';

import { AuthService } from '../../services/auth.service';
import { NavItem } from './../../models/nav-item.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  navItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: '/',
      divider: true
    },
    {
      displayName: 'Người dùng',
      iconName: 'group',
      route: '/users'
    },
    {
      displayName: 'Phân quyền',
      iconName: 'security',
      route: '/roles',
      divider: true
    },
    {
      displayName: 'Quản lý bài đăng',
      iconName: 'recent_actors',
      route: '/posts',
      divider: true
    },
    {
      displayName: 'Quản lý lịch họp',
      iconName: 'event',
      route: '/meetings',
      divider: true
    },
    {
      displayName: 'Quản lý sự kiện',
      iconName: 'event',
      children: [
        {
          displayName: 'Chủ đề',
          iconName: 'group',
          route: '/events/topics'
        },
        {
          displayName: 'Sự kiện',
          iconName: 'speaker_notes',
          route: '/events'
        }
      ]
    },
    {
      displayName: 'Quản lý dự án',
      iconName: 'recent_actors',
      divider: true,
      children: [
        {
          displayName: 'Chủ đề',
          iconName: 'group',
          route: '/projects/topics'
        },
        {
          displayName: 'Dự án',
          iconName: 'speaker_notes',
          route: '/projects',

        }
      ]
    },
    {
      displayName: 'Cài đặt',
      iconName: 'settings',
      route: '/settings'
    }
  ];

  screenWidth: number;

  constructor(public media: TdMediaService, private router: Router, private authService: AuthService) {
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {

  }

  navigateToProfilePage(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
