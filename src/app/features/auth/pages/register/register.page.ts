import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Sender } from '../../models/sender.model';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { finalize, timeout } from 'rxjs';
import { toast } from 'ngx-sonner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export class Register implements OnInit {
  Nom: string = '';
  Prenom: string = '';
  Telephone: number = 0;
  Adress: string = '';
  Email: string = '';
  Password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private detector: ChangeDetectorRef
  ) { }

  register() {
    const sender: Sender = {
      nom: this.Nom,
      prenom: this.Prenom,
      email: this.Email,
      password: this.Password,
      telephone: this.Telephone,
      adresse: this.Adress,
    };

    this.authService.register(sender)
      .subscribe({
        next: () => {
          toast.success("Account created successfully", {
            description: "You'll be redirected to Login in 3 seconds",
            duration: 4000
          });
          setTimeout(() => this.router.navigate(['/auth/login']), 3000);
        },
        error: (error) => {
          toast.error(error?.error?.message || error?.message || 'Something went wrong!');
        },
      });
  }

  registerWithGoogle(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  registerWithFacebook(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/facebook';
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
