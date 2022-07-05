import { FileInformation } from "../types/Structures.js"
import { User } from "./User.js"

/**
 * Extends a regular {@link User}, but email is available.
 */
export class ClientUser extends User {
    #email: string

    constructor(
        avatar: FileInformation | null,
        displayName: string,
        username: string,
        description: string,
        verified: boolean,
        email: string
    ) {
        super(avatar, displayName, username, description, verified)
        this.#email = email
    }

    /** E-mail address of the authorized user */
    get email() {
        return this.#email
    }

    /** Set the avatar of the currently logged-in user */
    set avatar(val: FileInformation | null) {
        this.updateAvatar(val)
    }
}