import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docs',
  imports: [RouterOutlet],
  template: `
    <p>
      <router-outlet />
    </p>
  `,
  styles: ``
})
export class DocsComponent {
}
