import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  token: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  ngOnInit() {
    this.titleService.setTitle('Xác thực email');

    this.apiService.post('/auth/confirm', { token: this.token }).subscribe(response => {
      if (response.success) {
        this.snackBar.open(response.message, '', { duration: 3000 });
        this.router.navigate(['/login']);
      }
    }, error => {
      this.snackBar.open(error, '', { duration: 3000 });
      this.router.navigate(['/login']);
    });
  }

}
