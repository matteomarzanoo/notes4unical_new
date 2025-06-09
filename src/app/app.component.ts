import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { ActiveUserService } from './features/users/shared/active-user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  constructor(private currentUser: ActiveUserService) { }

  ngOnInit() {
    if (this.currentUser.getUser()) {
      console.log('User logged in');
    } else {
      console.log('User logged out');
    }
  }
}