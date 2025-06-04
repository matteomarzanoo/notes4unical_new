import { UserRole } from "../../../core/auth/model/user-role"

export interface User {
    name: string,
    surname: string,
    email: string,
    faculty: string,
    role?: UserRole.USER
}

export interface Admin {
    name: string,
    surname: string,
    email: string,
    role: UserRole.ADMIN
}
