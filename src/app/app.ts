import { Component, OnInit, signal, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar/navbar';
import { NgxSonnerToaster } from 'ngx-sonner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { initAuth, login, logout } from './core/state/auth/auth.actions';
import { AuthEffects } from './core/state/auth/auth.effects';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgxSonnerToaster, NgxSpinnerModule],
  templateUrl: "./app.html",
  styleUrl: './app.css'
})

export class App {
  private store = inject(Store);

  constructor(private router: Router) {
    this.store.dispatch(initAuth());
  }

  isAuthPage(): boolean {
    return this.router.url.startsWith('/auth');
  }
}
