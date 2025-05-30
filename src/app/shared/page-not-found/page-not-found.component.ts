import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  template: `
    <h1>
      :(
    </h1>
    <h2>We apologize for the inconvenience, but something went wrong.</h2>
    <p>If you want to send us feedback, click on the <a routerLink="/feedback">link.</a></p>
  `,
  styles: ``
})
export class PageNotFoundComponent {

}
