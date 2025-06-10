export interface Doc {
    id?: number
    user_id?: number
    data: File,
    name: string,
    description: string,
    course: string
    validated?: boolean
}

export interface DocFile {
    base64Content: string,
    fileExtension: string,
    fileName: string
}
