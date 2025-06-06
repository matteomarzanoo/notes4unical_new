import { Routes } from "@angular/router"
import { UserComponent } from "./user/user.component"
import { authGuard } from "../../core/auth/services/auth.guard"
import { UserDocsComponent } from "./user/user-docs/user-docs.component"
import { UserFavoritesComponent } from "./user/user-favorites/user-favorites.component"
import { UserMessagesComponent } from "./user/user-messages/user-messages.component"
import { UserSettingsComponent } from "./user/user-settings/user-settings.component"

export const USERS_ROUTES: Routes = [
    { path: '', component: UserComponent, canActivate: [authGuard]},
    { path: ':name', component: UserComponent, canActivate: [authGuard] },
    { path: ':name/settings', component: UserSettingsComponent, canActivate: [authGuard] },
    { path: ':name/docs', component: UserDocsComponent, canActivate: [authGuard] },
    { path: ':name/favorites', component: UserFavoritesComponent, canActivate: [authGuard] },
    { path: ':name/messages', component: UserMessagesComponent, canActivate: [authGuard] }
]