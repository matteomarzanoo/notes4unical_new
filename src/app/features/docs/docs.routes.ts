import { Routes } from "@angular/router";
import { DocListComponent } from "./doc-list/doc-list.component";
import { DocUploadComponent } from "./doc-upload/doc-upload.component";
import { DocContentComponent } from "./doc-content/doc-content.component";
import { docActivateGuard } from "./shared/doc-activate.guard";

export const docRoutes: Routes = [
    {
        title: 'Last Documents | Notes4Unical - Be the Community',
        path: '',
        component: DocListComponent,
    },
    {
        title: 'Document Overview | Notes4Unical - Be the Community',
        path: ':id',
        component: DocContentComponent,
    },
    {
        title: 'Upload your Notes! | Notes4Unical - Be the Community',
        path: 'upload',
        component: DocUploadComponent,
        canActivate: [docActivateGuard]
    }
]