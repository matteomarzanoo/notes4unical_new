import { Component, OnInit } from '@angular/core';
import { User } from '../shared/users';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  imports: [NgOptimizedImage],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  currentUser!: User;
  items = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) { 
    this.route.queryParams
      .subscribe(() => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.currentUser = this.router.getCurrentNavigation()?.extras.state?.['activeUser'];
        }
      });
    this.titleService.setTitle(`${this.currentUser.name}\'s Profile | Notes4Unical - Be the community`);
  }

  goToSettings() {
    this.router.navigate(['settings'], { relativeTo: this.route });
  }
}
