import { ClientOptions } from "index"
import { UserSelfResponse } from "types/Responses.js"
import { FileInformation } from "types/Structures.js"
import { ClientAxios } from "./Axios.js"
import { ClientUser } from "./ClientUser.js"

export class Client {
    #bearerToken: string | null = null
    #axios: ClientAxios
    #clientUser: ClientUser

    constructor(clientOptions?: ClientOptions) {
        const options = clientOptions ?? {
            baseURL: "https://gifbox.revolt.chat", // prospective
        }
        this.#axios = new ClientAxios(options.baseURL)
    }

    get token() {
        return this.#bearerToken
    }

    async #updateClientUser() {
        const { data } = await this.#axios.get<UserSelfResponse>("/user/self")
        this.#clientUser = new ClientUser(
            data.avatar as unknown as FileInformation,
            data.displayName,
            data.username,
            data.description,
            data.verified,
            data.email
        )
    }

    get user() {
        return this.#clientUser
    }

    async loginBearer(token: string) {
        this.#axios.setBearerToken(token)
        this.#bearerToken = token
        await this.#updateClientUser()
    }

    async createSession(username: string, password: string) {
        //
    }
}