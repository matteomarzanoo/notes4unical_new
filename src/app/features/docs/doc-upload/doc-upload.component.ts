import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DocService } from '../shared/doc.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { docGuard } from '../shared/doc.guard';

@Component({
  selector: 'app-doc-upload',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.css']
})
export class DocUploadComponent implements OnDestroy {

  uploadSuccess = false;
  
  constructor(
    private docService: DocService,
    private router: Router
  ) {}
  
  ngOnDestroy(): void {
    this.uploadDoc.reset();
  }

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
    this.docService.addDoc(convertedInput).subscribe();

    this.uploadSuccess = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }

  onFilePicked(event: Event) {
    this.uploadDoc.patchValue({ file: (event.target as HTMLInputElement).files?.[0] });
  }

  delOngoing() {
  }

  canExit() {
    if (!this.uploadDoc.pristine) {
      return confirm('You want to leave unsaved document?'); 
    }
    return true;
  }
}
