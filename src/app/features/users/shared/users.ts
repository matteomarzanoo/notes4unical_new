import { UserRole } from "../../../core/auth/model/user-role"

export interface User {
    id?: number,
    name: string,
    surname: string,
    email: string,
    faculty: string,
    role?: UserRole.USER
}

export interface Admin {
    id?: number,
    name: string,
    surname: string,
    email: string,
    role: UserRole.ADMIN
}
