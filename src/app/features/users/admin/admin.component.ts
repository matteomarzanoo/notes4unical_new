import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUserService } from '../shared/active-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  currentTime: Date = new Date();
  private timer: any;

  constructor(private router: Router, private route: ActivatedRoute, protected currentUser: ActiveUserService) { }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  changeView(action: string): void {
    switch (action) {
      case 'changePassword':
        this.router.navigate(['changepwd']);
        break;
      case 'users':
        this.router.navigate(['users'], { relativeTo: this.route });
        break;
      case 'documents':
        this.router.navigate(['docs'], { relativeTo: this.route });
        break;
      default:
        this.router.navigate(['/'], { relativeTo: this.route });
        break;
    }
  }
}