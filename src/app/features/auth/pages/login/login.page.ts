import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class Login{
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): void {
    const body = { email: this.email, password: this.password };

    this.authService.login(body).subscribe({
      next: (response: any) => {
        console.log(response);
        setTimeout(() => {
          this.snackBar.open('Login successful', 'Done', {
            duration: 3000,
          });
          if (response.userRole == 'Manager') {
            this.router.navigate(['/admin/dashboard']);
          } else if (response.userRole == 'Sender') {
            this.router.navigate(['/']);
          }
        }, 1000);
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.snackBar.open(err.error.message, 'Done', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Something went wrong!', 'Done', {
            duration: 3000,
          });
        }
      },
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
