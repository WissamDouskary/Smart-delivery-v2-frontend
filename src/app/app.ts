import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: "./app.html",
  styleUrl: './app.css'
})

export class App {
  constructor(private router: Router) {}
  
  isAuthPage(): boolean {
    return this.router.url.startsWith('/auth');
  }
}
