import { FileInformation } from "../types/Structures.js"

/** A GIFBox user. */
export class User {
    #avatar: FileInformation | null
    #displayName: string
    #username: string
    #description: string
    #verified: boolean

    constructor(
        avatar: FileInformation | null,
        displayName: string,
        username: string,
        description: string,
        verified: boolean
    ) {
        this.#avatar = avatar
        this.#displayName = displayName
        this.#username = username
        this.#description = description
        this.#verified = verified
    }

    /** {@link FileInformation} of the user's avatar. *May be `null`.* */
    get avatar() {
        return this.#avatar
    }

    /** Display name of the user. May be any Unicode sequence up to 50 characters total. */
    get displayName() {
        return this.#displayName
    }

    /** Username of the user. Alphanumeric, from 3 up to 50 characters total. */
    get username() {
        return this.#username
    }

    /** Description of the user. Up to 2048 characters in length, may be empty. */
    get description() {
        return this.#description
    }

    /** Boolean value that is true if the user is marked as a verified user. */
    get verified() {
        return this.#verified
    }
}