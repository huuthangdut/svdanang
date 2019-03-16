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

  constructor(private _router: Router) { }

  logout(): void {
    this._router.navigate(['/login']);
  }
}
