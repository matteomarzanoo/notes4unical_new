import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docs',
  standalone: true, // 👈 AGGIUNGI QUESTO
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class DocsComponent {}
