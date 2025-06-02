import { Routes } from "@angular/router"
import { UserRole } from "../../core/auth/model/user-role"
import { inject } from "@angular/core"
import { AuthService } from "../../core/auth/services/auth.service"

export const userRoutes: Routes = [
    {
        path : '',
        loadComponent: () => import('../../core/auth/components/login/login.component').then(c => c.LoginComponent),
        redirectTo: () => {
            const authService = inject(AuthService)
            /** Aggiungere il controllo per il tipo di account */
            if (authService.isLoggedIn()) {
                return 'user'
            } else if (authService.isLoggedIn() && authService.isAdmin()) {
                return 'admin'
                } else {
                return '';
            }
        }
    },
    {
        path: 'user/new',
        loadComponent: () => import('./admin/admin-genuser/admin-genuser.component').then(c => c.AdminGenuserComponent),
        data: { requiredRole: [UserRole.ADMIN] }
    },
    {
        path: 'user',
        loadComponent: () => import('./user/user.component').then(c => c.UserComponent),
        data: { requiredRole: [UserRole.USER] }
    },
    {
        path: 'admin/docs',
        title: 'Docs Management | Notes4Unical - Be the community',
        loadComponent: () => import('./admin/admin-docs/admin-docs.component').then(c => c.AdminDocsComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent),
        data: { requiredRole: [UserRole.ADMIN] }
    },
]