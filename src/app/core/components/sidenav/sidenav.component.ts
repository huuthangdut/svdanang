import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  routes: Object[] = [{
    title: 'Dashboard',
    route: '/',
    icon: 'dashboard',
  }, {
    title: 'Manage Users',
    route: '/users',
    icon: 'people',
  },
  {
    title: 'Manage Roles and Permissions',
    route: '/users',
    icon: 'check',
  },
  {
    title: 'Manage Events',
    route: '/users',
    icon: 'people',
  },
  {
    title: 'Manage Projects',
    route: '/users',
    icon: 'people',
  },
  {
    title: 'Settings',
    route: '/users',
    icon: 'settings',
  }
  ];

  screenWidth: number;

  constructor(private _router: Router) {
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  logout(): void {
    this._router.navigate(['/login']);
  }
}
