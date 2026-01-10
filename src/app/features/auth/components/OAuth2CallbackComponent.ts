import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-oauth2-callback',
  template: '<p>Logging in...</p>'
})
export class OAuth2CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const role = this.route.snapshot.queryParamMap.get('userRole');

    if (token && role) {
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userRole', role);

      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}