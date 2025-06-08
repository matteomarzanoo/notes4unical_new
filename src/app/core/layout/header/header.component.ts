import { Component, DoCheck } from '@angular/core';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../../features/users/shared/users'; 

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
  isHomePage = false;
  isHovered = false;
  user: User | null = null;

  constructor(private router: Router, private authService: AuthService) { 
    this.loadUserFromSession();
  }

  ngDoCheck() {
    this.loadUserFromSession();
  }

  private loadUserFromSession() {
    const stored = sessionStorage.getItem('user');
    if (stored !== null) {
      try {
        this.user = JSON.parse(stored) as User;
      } catch {
        this.user = null;
      }
    } else {
      this.user = null;
    }
  }

  toggleTheme(event: any) {
    const ids = ["mainHome", "h2recent", "header", "footer", "documentSection", "popup", "login-container", "mainHome", "notes-section"];
    const backgroundColor = event.target.checked ? "rgb(28, 25, 25)" : "white";
    const textColor = event.target.checked ? "white" : "black";

    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.setProperty("background-color", backgroundColor, "important");
        element.style.setProperty("color", textColor, "important");
      }
    });

    document.body.style.setProperty("background-color", backgroundColor, "important");
    document.body.style.setProperty("color", textColor, "important");
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

 logout(event: Event) {
    event.preventDefault();

    this.authService.logout().subscribe({
      next: () => {
        sessionStorage.clear(),
        console.log('Logout request sended. sessionStorage cleared');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Error logout\'s request:', err);
      }
    });
  }

  goToFavorites() {
    if (this.authService.isLoggedIn() === 'true' && this.user) {
      this.router.navigate(['/user', this.user.name.toLowerCase(), 'favorites'], { state: { activeUser: this.user }});
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToUser() {
    if (this.authService.isLoggedIn() === 'true' && this.user) {
      this.router.navigate(['/user', this.user.name.toLowerCase()], { state: { activeUser: this.user }});
    } else {
      this.router.navigate(['/login']);
    }
  }
}
