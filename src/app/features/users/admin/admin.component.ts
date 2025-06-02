import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [],
  template: `
    <h1>Welcome Back, {{ 'admin.name' }}</h1>
    <p>Last Login: {{ 'datetime.toDB' }}</p>

    <nav>
      <button (click)="changeView('documents')">Documents</button>
      <button (click)="changeView('messages')">Messages</button>
      <button (click)="changeView('users')">Users</button>
      <button (click)="changeView('changePassword')">Change Password</button>
      <button (click)="logout()">Logout</button>
    </nav>
    `,
  styles: ``
})
export class AdminComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  changeView(action: string) : void {
    switch(action) {
      case 'changePassword':
        console.log('Change Password clicked');
        this.router.navigate(['changePass'], { relativeTo: this.route })
        break;
      case 'users':
        console.log('Users clicked');
        this.router.navigate(['users'], { relativeTo: this.route })
        break;
      case 'messages':
        console.log('Messages clicked');
        this.router.navigate(['messages'], { relativeTo: this.route })
        break;
      case 'documents':
        console.log('Documents clicked');
        this.router.navigate(['docs'], { relativeTo: this.route })
        break;
      default:
        console.log('Unknown action');
        this.router.navigate(['/'], { relativeTo: this.route })
        break;
    }
  }

  logout() {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }
  }
}
