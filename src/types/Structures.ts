/**
 * Stores the suspension state of a user, ID and expiration.
 */
export type SuspensionState = {
    _id: string,
    expirationDate: Date | null
}

/**
 * Contains information about a file.
 */
export type FileInformation = {
    /** File ID. */
    _id: string,
    /** Canonical file name that can be used to request the file. */
    fileName: string,
    /** File name used during upload. */
    originalFileName: string,
    /** File extension without dot. */
    extension: string,
    /**
     * The file category, for example "posts" for files of posts.
     * Does not necessarily correspond to the actual S3 object storage bucket.
     */
    bucket: string,
    /** MIME type of the file. */
    mimeType: string,
    /** {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString ISO date string} of the upload time and date. */
    uploadDate: string,
    /** The file author's ID. */
    author: string,
    /** Size in bytes. */
    size: number,
    /** SHA-512 hash of the file. */
    sha512: string
}

/**
 * Stores a favorited URL object.
 */
export type FavoriteURL = {
    /** Favorite ID. */
    _id: string,
    /** URL of the favorite, usually an image. */
    url: string,
    /** ID of the favorite's author. */
    author: string,
    /** Unix timestamp of when the item was favorited. */
    favoritedAt: string,
}