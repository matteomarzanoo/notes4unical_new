import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DocService } from '../shared/doc.service';

@Component({
  selector: 'app-doc-upload',
  imports: [ReactiveFormsModule],
  template: `
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

      <label for="description">
        Insert a Description
        <input 
          type="text" 
          name="file" 
          id="description" 
          formControlName="description" />
      </label>

      <label for="course">
        Insert the Course
        <input 
          type="text" 
          name="file" 
          id="course" 
          formControlName="course"/>
      </label>

      <button [disabled]="!uploadDoc.valid">Upload</button>
      <button (click)="delOngoing()">Cancel</button>
    </form>
  `,
  styles: ``
})
export class DocUploadComponent {
  
  constructor(private readonly docService: DocService) {}

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
  }

  onFilePicked(event: Event) {
    this.uploadDoc.patchValue({ file: (event.target as HTMLInputElement).files?.[0] });
  }

  delOngoing() {
    if (confirm("Filling in progress. Are you sure you want to exit?")) {
      return true;
    } else {
      return false;
    }
  }
}
