import { Component, Input} from '@angular/core';
import { Doc } from '../shared/doc';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doc',
  imports: [],
  template: `
    <div class="card">
      <div class="card-image"></div>
      <div class="category"> {{ doc.course }} </div>
      <div class="heading"> {{ doc.name }}
        <!-- Aggiungere data di caricamento nel DB -->
        <div class="author"> By <span class="name">{{ doc.name }}</span> 4 days ago</div>
      </div>
      <div>
        <a (click)="goToDoc()">Learn More</a>
      </div>
    </div>
  `,
  styles: `
    .card {
      width: 190px;
      background: white;
      padding: .4em;
      border-radius: 6px;
    }

    .card-image {
      background-color: rgb(236, 236, 236);
      width: 100%;
      height: 130px;
      border-radius: 6px 6px 0 0;
    }

    .card-image:hover {
      transform: scale(0.98);
    }

    .category {
      text-transform: uppercase;
      font-size: 0.7em;
      font-weight: 600;
      color: rgb(63, 121, 230);
      padding: 10px 7px 0;
    }

    .category:hover {
      cursor: pointer;
    }

    .heading {
      font-weight: 600;
      color: rgb(88, 87, 87);
      padding: 7px;
    }

    .heading:hover {
      cursor: pointer;
    }

    .author {
      color: gray;
      font-weight: 400;
      font-size: 11px;
      padding-top: 20px;
    }

    .name {
      font-weight: 600;
    }

    .name:hover {
      cursor: pointer;
    }
  `
})
export class DocComponent{
  @Input() doc!: Doc;
  @Input() index!: Number;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  goToDoc() {
    this.router.navigate([this.index], { state: { docTaken: this.doc }, relativeTo: this.route })
  }
}
