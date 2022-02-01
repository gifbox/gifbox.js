import { FileInformation } from "types/Structures"

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

    get avatar() {
        return this.#avatar
    }

    get displayName() {
        return this.#displayName
    }

    get username() {
        return this.#username
    }

    get description() {
        return this.#description
    }

    get verified() {
        return this.#verified
    }
}