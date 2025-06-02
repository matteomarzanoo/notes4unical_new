import { Component, Input} from '@angular/core';
import { Doc } from '../shared/doc';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doc',
  imports: [],
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent{
  @Input() doc!: Doc;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  goToDoc() {
    this.router.navigate([this.doc.id], { state: { docTaken: this.doc }, relativeTo: this.route })
  }
}
