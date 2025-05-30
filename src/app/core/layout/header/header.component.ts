import { RouterModule } from '@angular/router';
import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isHomePage = false;
  isHovered = false;

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = event.urlAfterRedirects === '/';
    });
  }

  toggleTheme(event: any) {
    const ids = ["mainHome","h2recent","header","footer","documentSection","popup","login-container"];
    const backgroundColor = event.target.checked ? "rgb(28, 25, 25)" : "white";
    const textColor = event.target.checked ? "white" : "black";
    
    ids.forEach((id) => {
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
}