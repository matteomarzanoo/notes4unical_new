import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { User } from '../shared/users';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  test: User = {
    name: 'Mimmo',
    surname: 'Cavallato',
    email: 'puttanaimammta@gmail.com',
    faculty: 'Puttaneria'
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  goToSettings() {
    this.router.navigate(['settings'], { relativeTo: this.route });
  }
}
