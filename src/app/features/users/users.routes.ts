import { Routes } from "@angular/router"
import { UserComponent } from "./user/user.component"
import { authGuard } from "../../core/auth/services/auth.guard"
import { UserFavoritesComponent } from "./user/user-favorites/user-favorites.component"
import { UserSettingsComponent } from "./user/user-settings/user-settings.component"
import { UserListComponent } from "./user/user-list/user-list.component"

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
    { 
        path: ':name/list', 
        component: UserListComponent, 
        canActivate: [authGuard] 
    },
    { 
        path: ':name/favorites', 
        component: UserFavoritesComponent, 
        canActivate: [authGuard] 
    },
]