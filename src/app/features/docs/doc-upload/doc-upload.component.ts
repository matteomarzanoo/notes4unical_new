import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DocService } from '../shared/doc.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-doc-upload',
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <ng-container *ngIf="!uploadSuccess; else successScreen">
      <form [formGroup]="uploadDoc" (ngSubmit)="onLoad()">
        <label for="file">
          Upload a Document
          <input 
            type="file" 
            name="file" 
            id="file" 
            formControlName = "file"
            accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt"
            (change)="onFilePicked($event)" />
        </label>

        <label for="name">
          Enter a Name
          <input 
            type="text" 
            name="file" 
            id="name" 
            formControlName="name" />
        </label>

        <label for="course">
          Insert the Course
          <input 
            type="text" 
            name="file" 
            id="course" 
            formControlName="course"/>
        </label>

        <label for="description">
          Insert a Description
          <textarea
            id="description"
            name="description"
            formControlName="description"
            rows="5"
            placeholder="Describe your document here..."></textarea>
        </label>

        <button [disabled]="!uploadDoc.valid">Upload</button>
        <button type="button" (click)="delOngoing()">Cancel</button>
      </form>
    </ng-container>
    <ng-template #successScreen>
      <div class="success-container">
        <h1 style="font-size: 4rem; margin-bottom: 0.5em;">👍</h1>
        <h2>Upload avvenuto con successo!</h2>
        <div class="progress-bar">
          <div class="progress"></div>
        </div>
      </div>
    </ng-template>
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
      margin-top: 2rem;
    }

    label {
      display: flex;
      flex-direction: column;
      font-weight: 500;
      color: #444;
      gap: 0.4rem;
    }

    input[type="text"],
    input[type="file"] {
      padding: 0.6em 0.8em;
      border: 1px solid #bdbdbd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
      outline: none;
      background: #fafbfc;
    }

    input[type="text"]:focus,
    input[type="file"]:focus {
      border-color: #1976d2;
      background: #f0f7ff;
    }

    textarea {
      padding: 1em 1.2em;
      border: 1px solid #bdbdbd;
      border-radius: 4px;
      font-size: 1.1rem;
      min-height: 160px;
      resize: vertical;
      transition: border-color 0.2s, background 0.2s;
      outline: none;
      background: #fafbfc;
      color: #222;
      margin-top: 0.2em;
    }

    textarea:focus {
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

    .success-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-top: 2rem;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 1rem;
    }

    .progress {
      height: 100%;
      width: 0;
      background: #76c7c0;
      animation: progress-animation 2s forwards;
    }

    @keyframes progress-animation {
      from { width: 0; }
      to { width: 100%; }
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
export class DocUploadComponent {

  uploadSuccess = false;
  
  constructor(
    private readonly docService: DocService,
    private readonly router: Router
  ) {}

  private builder = inject(NonNullableFormBuilder);

  uploadDoc = this.builder.group({
    file: new FormControl<File | null>(null, Validators.required),
    name: new FormControl<string>('', [Validators.minLength(1), Validators.maxLength(200), Validators.required]),
    description: new FormControl<string>('', [Validators.minLength(1), Validators.maxLength(1000), Validators.required]),
    course: new FormControl<string>('', [Validators.minLength(1), Validators.maxLength(200), Validators.required])
  })

  onLoad() {
    const convertedInput = new FormData();
    convertedInput.append('data', this.uploadDoc.value.file!);
    convertedInput.append('name', String(this.uploadDoc.value.name));
    convertedInput.append('description', String(this.uploadDoc.value.description));
    convertedInput.append('course', String(this.uploadDoc.value.course));
    this.docService.addDoc(convertedInput);

    this.uploadSuccess = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }

  onFilePicked(event: Event) {
    this.uploadDoc.patchValue({ file: (event.target as HTMLInputElement).files?.[0] });
  }

  delOngoing() {
    this.router.navigate(['/'])
  }
}
