import { Component, DoCheck } from '@angular/core';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../features/users/shared/users'; 
import { ActiveUserService } from '../../../features/users/shared/active-user.service';
import { UserRole } from '../../auth/model/user-role';

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

  constructor(private router: Router, private currentUser: ActiveUserService) { 
    this.loadUserFromSession();
  }

  ngDoCheck() {
    this.loadUserFromSession();
  }

  private loadUserFromSession() {
    this.user = this.currentUser.getUser();

    if (!this.user) {
      this.user = null;
    }
  }

  toggleTheme(event: any) {
const ids = [
  "mainHome", "welcomeTitle", "documentSection", "favoritesSection",
  "h2recent", "dividerLine", "userSidebar", "userContent",
  "carouselDocs", "noDocsMessage", "noFavsMessage",
  "popup", "login-container", "notes-section", "header", "footer"
];
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
    this.currentUser.clearUser();
    this.router.navigate(['/login']);
  }

  goToFavorites() {
    if (this.currentUser.getUser()) {
      this.router.navigate(['/user', this.currentUser.getUser()!.name.toLowerCase(), 'favorites']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToUser() {
    if (this.currentUser.getUser()?.role === UserRole.ADMIN) {
      this.router.navigate(['/admin']);
    } else if (this.currentUser.getUser()?.role === UserRole.USER) {
      this.router.navigate(['/user', this.currentUser.getUser()!.name.toLowerCase()]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
