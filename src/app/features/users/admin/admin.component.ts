import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  template: `
    <h1>Welcome Back, {{ 'admin.name' }}</h1>
    <p>Last Login: {{ 'datetime.toDB' }}</p>

    <button (change)="onSelect($event)">Documents</button>
    <button (change)="onSelect($event)">Messages</button>
    <button (change)="onSelect($event)">Users</button>
    <button (change)="onSelect($event)">Change Password</button>
    <button (change)="onSelect($event)">Logout</button>
    `,
  styles: ``
})
export class AdminComponent {
  onSelect(event: Event) {
    
  }
}
