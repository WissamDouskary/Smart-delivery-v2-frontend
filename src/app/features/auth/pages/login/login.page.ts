import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class Login {
  email: string = '';
  password: string = '';
  Loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private detector: ChangeDetectorRef
  ) { }

  login(): void {
    this.Loading = true;

    const body = { email: this.email, password: this.password };

    this.authService.login(body)
      .pipe(
        finalize(() => {
          this.Loading = false;
          this.detector.markForCheck();
        })
      )
      .subscribe({
        next: (response: any) => {
          toast.success('Login successful');

          if (response.userRole === 'Manager') {
            this.router.navigate(['/admin/dashboard']);
          } else if (response.userRole === 'Sender') {
            this.router.navigate(['/']);
          } else if (response.userRole === 'Livreur'){
            this.router.navigate(['/colis'])
          }
        },
        error: (err: any) => {
          toast.error(err?.error?.message || 'Something went wrong!');
        }
      });
  }

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  loginWithFacebook(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/facebook';
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
