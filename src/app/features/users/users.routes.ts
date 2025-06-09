import { Routes } from "@angular/router"
import { UserComponent } from "./user/user.component"
import { authGuard } from "../../core/auth/services/auth.guard"
import { UserSettingsComponent } from "./user/user-settings/user-settings.component"

export const USERS_ROUTES: Routes = [
    { 
        path: '', 
        component: UserComponent, 
        canActivate: [authGuard]
    },
    {
        path: ':name', 
        component: UserComponent, 
        canActivate: [authGuard] 
    },
    {
        path: ':name/settings', 
        component: UserSettingsComponent, 
        canActivate: [authGuard] 
    },
]