import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [RouterOutlet],
  template: `<router-outlet />`
})
export class UsersComponent {}
