import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sender } from '../../models/sender.model';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, timeout } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export class Register implements OnInit{
  Nom: string = '';
  Prenom: string = '';
  Telephone: number = 0;
  Adress: string = '';
  Email: string = '';
  Password: string = '';

  Loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private popUp: MatSnackBar
  ) {}

  register() {
    this.Loading = true;

    const sender: Sender = {
      nom: this.Nom,
      prenom: this.Prenom,
      email: this.Email,
      password: this.Password,
      telephone: this.Telephone,
      adresse: this.Adress,
    };

    this.authService.register(sender)
    .pipe(
      finalize(() => {
        this.Loading = false;
      })
    )
    .subscribe({
      next: () => {
        this.popUp.open(
          "Account created successfully, You'll redirect to Login after 3 second",
          'Done',
          {
            duration: 4000,
          }
        );
        setInterval(() => this.router.navigate(['/login']), 3000);
      },
      error: (error) => {
        if (error.message || error.error) {
          this.popUp.open(
            error.message,
            'Done',
            {
              duration: 3000,
            }
          );
        }
      },
    });
  }

  ngOnInit(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }
}
