export interface Doc {
    id?: number
    user_id?: number
    data: File,
    name: string,
    description: string,
    course: string
    subject?: string
    validated?: boolean
    validated_admin?: number
}
