import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUserService } from '../../shared/active-user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit, OnDestroy {

  constructor(private currentUser: ActiveUserService, private router: Router, private route: ActivatedRoute, private titleService: Title) { 
    this.titleService.setTitle(`${this.currentUser.getUser()!.name}\'s Settings | Notes4Unical - Be the community`);
  }

  ngOnInit(): void {
    this.userInfo.setValue({
      name: this.currentUser.getUser()!.name,
      surname: this.currentUser.getUser()!.surname,
      email: this.currentUser.getUser()!.email,
      faculty: this.currentUser.getUser()!.faculty
    });
  }

  ngOnDestroy(): void {
    this.userInfo.reset();
  }

  userInfo = inject(NonNullableFormBuilder).group({
    name: new FormControl<string>({ value: '', disabled: true }),
    surname: new FormControl<string>({ value: '', disabled: true }),
    email: new FormControl<string>({ value: '', disabled: true }),
    faculty: new FormControl<string>({ value: '', disabled: true })
  })

  goToChangePwd() {
    this.router.navigate(['/changepwd']);
  }
}
