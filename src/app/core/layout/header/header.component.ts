import { Component, Renderer2, DoCheck } from '@angular/core';
import { Router, NavigationEnd, RouterModule, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
  isHomePage = false;
  isHovered = false;
  user: any = null;

  constructor(private renderer: Renderer2, private router: Router, private authService: AuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = event.urlAfterRedirects === '/';
    });

    this.loadUser();
  }

  ngDoCheck() {
    this.loadUser();
  }

  private loadUser() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  toggleTheme(event: any) {
    const ids = ["mainHome", "h2recent", "header", "footer", "documentSection", "popup", "login-container"];
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
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');

        this.user = null;
        console.log('Logout effettuato, stato pulito');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Errore durante il logout:', err);
      }
    });
  }
}
