import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Doc } from './shared/doc';
import { DocService } from './shared/doc.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-docs',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article class="details-panel" *ngIf="(doc$ | async) as doc">
      <article>
        <h1 class="main-text">Hi, I'm {{doc.name}}</h1>
        <h2>The owner of the text is <span class="emphasize">{{doc.name}}</span></h2>
        <p>{{doc.description}}</p>
        <p>I live in <span class="emphasize"> Italy </span></p>
      </article>
    </article>

    <form [formGroup]="docForm" (ngSubmit)="onSubmit()">
      <label for="file">
        <input required type="file" (change)="onFilePicked($event)" id="file">
      </label>

      <label for="name">
        <input required type="text" id="name" formControlName="name">
      </label>

      <label for="description">
        <input required type="text" id="description" formControlName="description">
      </label>

      <label for="course">
        <input required type="text" id="course" formControlName="course">
      </label>

      <button type="submit">Submit Document</button>
    </form>
  `,
  styles: [`
  .details-panel {
    display: flex;
    padding: 10px;
    gap: 50px;
  }
  .main-img {
    border-radius: 10px;
    width: 400px;
  }
  .main-text {
    font-size: 34pt;
    margin-bottom: 20px;
  }
  .emphasize {
    font-weight: bold;
  }
  h2 {

  }
`]
})
export class DocsComponent implements OnInit {
  doc$!: Observable<Doc | undefined>;
  private docService = inject(DocService);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(NonNullableFormBuilder);
  
  ngOnInit(): void {
    this.doc$ = this.route.paramMap.pipe(map(params => {
      return this.docService.docs[Number(params.get('index'))]
    }))
  }

  docForm = this.formBuilder.group({
    file: new FormControl<File | null>(null),
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(''),
    course: new FormControl<string>('', Validators.required)
  })

  onSubmit() {
    const convertedInput = new FormData();
    
    convertedInput.append('file', this.docForm.value.file!);
    convertedInput.append('name', String(this.docForm.value.name));
    convertedInput.append('description', String(this.docForm.value.description));
    convertedInput.append('course', String(this.docForm.value.course));

    this.docService.addDoc(convertedInput);
  }

  onFilePicked(event: Event) {
    this.docForm.patchValue({ file: (event.target as HTMLInputElement).files?.[0] })
  }

}
