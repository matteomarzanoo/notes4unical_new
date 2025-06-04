import { Routes } from "@angular/router"
import { UserComponent } from "./user/user.component"
import { AuthGuard } from "../../core/auth/services/auth.guard"
import { UserDocsComponent } from "./user/user-docs/user-docs.component"
import { UserFavoritesComponent } from "./user/user-favorites/user-favorites.component"
import { UserMessagesComponent } from "./user/user-messages/user-messages.component"
import { UserSettingsComponent } from "./user/user-settings/user-settings.component"


export const USERS_ROUTES: Routes = [
    { path: '', component: UserComponent, canActivate: [AuthGuard] },
    { path: ':name', component: UserComponent, canActivate: [AuthGuard] },
    { path: ':name/settings', component: UserSettingsComponent, canActivate: [AuthGuard] },
    { path: ':name/docs', component: UserDocsComponent, canActivate: [AuthGuard] },
    { path: ':name/favorites', component: UserFavoritesComponent, canActivate: [AuthGuard] },
    { path: ':name/messages', component: UserMessagesComponent, canActivate: [AuthGuard] }
]