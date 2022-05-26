import { FileInformation } from "../types/Structures.js"
import { User } from "./User.js"

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

    get email() {
        return this.#email
    }
}