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
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      color: #333;
      font-family: 'Segoe UI', Arial, sans-serif;
    }

    h1 {
      font-size: 6rem;
      margin: 0.5em 0 0.2em 0;
      color: #e57373;
      font-weight: bold;
      letter-spacing: 0.1em;
    }

    h2 {
      font-size: 1.5rem;
      margin: 0.2em 0 1em 0;
      color: #444;
      font-weight: 500;
      text-align: center;
    }

    p {
      font-size: 1.1rem;
      color: #555;
      text-align: center;
    }

    a[routerLink] {
      color: #1976d2;
      text-decoration: underline;
      font-weight: 500;
      transition: color 0.2s;
    }

    a[routerLink]:hover {
      color: #0d47a1;
      text-decoration: underline wavy;
    }
  `
})
export class PageNotFoundComponent {}
