import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../../../core/state/auth/auth.actions';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class Login implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  email: string = '';
  password: string = '';

  login(): void {
    const credentials = { email: this.email, password: this.password };
    this.store.dispatch(login({ credentials }));
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
