import { Routes } from '@angular/router';
import { DocListComponent } from './features/docs/doc-list/doc-list.component';
import { DocsComponent } from './features/docs/docs.component';

export const routes: Routes = [
    {
        path: 'list',
        component: DocListComponent 
    },
    {
        path: 'details/:index',
        component: DocsComponent,
    }
];
