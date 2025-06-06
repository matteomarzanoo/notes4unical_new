import { Routes } from "@angular/router";
import { DocListComponent } from "./doc-list/doc-list.component";
import { DocUploadComponent } from "./doc-upload/doc-upload.component";
import { DocContentComponent } from "./doc-content/doc-content.component";
import { authGuard } from "../../core/auth/services/auth.guard";
import { docGuard } from "./shared/doc.guard";

export const DOC_ROUTES: Routes = [
    { 
        title: 'Upload your Notes! | Notes4Unical - Be the Community', 
        path: 'upload', 
        component: DocUploadComponent, 
        canActivate: [authGuard], 
        canDeactivate:[docGuard]
    },
    { 
        title: 'Last Documents | Notes4Unical - Be the Community', 
        path: '', 
        component: DocListComponent 
    },
    { 
        title: 'Document Overview | Notes4Unical - Be the Community', 
        path: ':id', 
        component: DocContentComponent 
    },
]