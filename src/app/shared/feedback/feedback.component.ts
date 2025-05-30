import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, NonNullableFormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  imports: [ReactiveFormsModule],
  template: `
    <h1>Share with us your thoughts!</h1>
    <p>Fill out the form below and let us know what problems you encountered</p>
    <form [formGroup]="feedbackForm" (ngSubmit)="onSend()">
      <label for="name">
        Name
        <input 
          type="text" 
          name="name" 
          id="name"
          formControlName="name" />
      </label>

      <label for="surname">
        Surname
        <input 
          type="text" 
          name="surname" 
          id="surname"
          formControlName="surname" />
      </label>

      <label for="email">
        E-mail
        <input 
          type="text" 
          name="email" 
          id="email"
          formControlName="email" />
      </label>

      <label for="description">
        Give us a hint!
        <textarea
        name="description"
        id="description"
        formControlName="description"
        rows="5"
        placeholder="Describe your issue or suggestion here..."></textarea>
      </label>

      <button [disabled]="!feedbackForm.valid">Send</button>
      <button (click)="delOngoing()">Cancel</button>
    </form>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      min-height: 80vh;
      color: #333;
      font-family: 'Segoe UI', Arial, sans-serif;
    }

    h1 {
      margin-top: 2rem;
      font-size: 2.2rem;
      color: #800020;
      font-weight: bold;
      text-align: center;
    }

    p {
      font-size: 1.1rem;
      color: #555;
      text-align: center;
      margin-bottom: 2rem;
    }

    form {
      background: #fff;
      padding: 2rem 2.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      min-width: 320px;
      max-width: 400px;
      width: 100%;
    }

    label {
      display: flex;
      flex-direction: column;
      font-weight: 500;
      color: #444;
      gap: 0.4rem;
    }

    input[type="text"] {
      padding: 0.6em 0.8em;
      border: 1px solid #bdbdbd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
      outline: none;
    }

    input[type="text"]:focus {
      border-color: #1976d2;
      background: #f0f7ff;
    }

    button {
      padding: 0.7em 1.2em;
      margin-top: 0.5em;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      background: #1976d2;
      color: #fff;
      transition: background 0.2s;
    }

    button[disabled] {
      background: #bdbdbd;
      cursor: not-allowed;
    }

    button + button {
      background: #e57373;
      margin-left: 0.7em;
    }

    button + button:hover {
      background: #c62828;
    }

    textarea {
      padding: 0.8em 1em;
      border: 1px solid #bdbdbd;
      border-radius: 4px;
      font-size: 1rem;
      min-height: 120px;
      resize: vertical;
      transition: border-color 0.2s;
      outline: none;
      background: #fafbfc;
    }

    textarea:focus {
      border-color: #1976d2;
      background: #f0f7ff;
    }

    @media (max-width: 500px) {
      form {
        padding: 1rem;
        min-width: unset;
        max-width: 100%;
      }
    }
  `
})
export class FeedbackComponent {

  private builder = inject(NonNullableFormBuilder);

  constructor() { /** Implementare servizio per feedback */ }

  feedbackForm = this.builder.group({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('', Validators.required),
  })

  onSend() {}

  delOngoing() {
    if (confirm("Filling in progress. Are you sure you want to exit?")) {
      return true;
    } else {
      return false;
    }
  }
}
