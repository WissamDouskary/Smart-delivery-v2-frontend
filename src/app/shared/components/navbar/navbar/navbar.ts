import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true,
})
export class NavbarComponent {
  menuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  logout() {
    this.authService.logout();
    toast.success("Logout successfuly");
    this.router.navigate(['/auth/login']);
  }
}
