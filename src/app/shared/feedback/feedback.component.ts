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
        <input 
          type="text" 
          name="description" 
          id="description"
          formControlName="description" />
      </label>

      <button [disabled]="!feedbackForm.valid">Send</button>
      <button (click)="delOngoing()">Cancel</button>
    </form>
  `,
  styles: ``
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
