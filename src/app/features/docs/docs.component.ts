import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docs',
  standalone: true, // 👈 AGGIUNGI QUESTO
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
})
export class DocsComponent {}
