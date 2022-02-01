export type SuspensionState = {
    _id: string,
    expirationDate: Date | null
}

export type FileInformation = {
    _id: string,
    fileName: string,
    originalFileName: string,
    extension: string,
    bucket: string,
    mimeType: string,
    uploadDate: string,
    author: string,
    size: string,
    sha512: string
}