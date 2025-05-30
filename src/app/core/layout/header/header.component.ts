import { Component, Renderer2, DoCheck } from '@angular/core';
import { Router, NavigationEnd, RouterModule, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

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

  constructor(private renderer: Renderer2, private router: Router) {
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
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']);
  }
}
