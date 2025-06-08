import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActiveUserService } from '../../shared/active-user.service';

@Component({
  selector: 'app-user-favorites',
  imports: [],
  template: `
    <p>
      user-favorites works!
    </p>
  `,
  styles: ``
})
export class UserFavoritesComponent {

  constructor(private titleService: Title, private currentUser: ActiveUserService) { 
    this.titleService.setTitle(`${this.currentUser.getUser()!.name}\'s Favorites | Notes4Unical - Be the community`) 
  }

  
}
