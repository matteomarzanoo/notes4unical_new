import { Routes } from "@angular/router"
import { UserRole } from "../../core/auth/model/user-role"

export const userRoutes: Routes = [
    {
        path : '',
        loadComponent: () => import('../../core/auth/components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'user/new',
        loadComponent: () => import('./admin/admin-genuser/admin-genuser.component').then(c => c.AdminGenuserComponent),
        canActivate: [],
        canDeactivate: [],
        data: { requiredRole: [UserRole.ADMIN] }
    },
    {
        path: 'user',
        loadComponent: () => import('./user/user.component').then(c => c.UserComponent),
        canActivate: [],
        data: { requiredRole: [UserRole.USER] }
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent),
        canActivate: [],
        data: { requiredRole: [UserRole.ADMIN] }
    }, 

]