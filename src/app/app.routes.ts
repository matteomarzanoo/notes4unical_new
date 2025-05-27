import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { LoginComponent } from './core/auth/components/components/login/login.component';
import { RegisterComponent } from './core/auth/components/components/register/register.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { UserComponent } from './features/users/user/user.component';
import { ChangepwdComponent } from './core/auth/components/components/changepwd/changepwd.component';
import { AdminComponent } from './features/users/admin/admin.component';
import { AuthGuard } from './core/auth/services/auth.guard';

import { DocComponent } from './features/docs/doc/doc.component';
// import { UploadDocumentComponent } from './features/docs/upload-document/upload-document.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'footer', component: FooterComponent },

  { path: 'user', component: UserComponent },
  { path: 'change-password', component: ChangepwdComponent },
  { path: 'admin', component: AdminComponent },

  { path: 'doc/:id/:title/:subject/:year', component: DocComponent },
//   { path: 'upload-document', component: UploadDocumentComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];