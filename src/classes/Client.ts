import { ClientOptions } from "index"
import { UserSelfResponse, SessionCreateResponse, GenericSuccess, SessionListResponse, SessionCurrentResponse } from "types/Responses.js"
import { FileInformation } from "types/Structures.js"
import { ClientAxios } from "./Axios.js"
import { ClientUser } from "./ClientUser.js"

export class Client {
    #bearerToken: string | null = null
    #axios: ClientAxios
    #clientUser: ClientUser | null = null

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

    async createSession(email: string, password: string, sessionName: string) {
        const { data } = await this.#axios.post<SessionCreateResponse>("/session/create", {
            email, password, sessionName
        })
        await this.loginBearer(data.token)
    }

    async logout() {
        const session = await this.getCurrentSession()
        await this.deleteSession(session._id)

        this.#clientUser = null
        this.#bearerToken = null
    }

    async getCurrentSession(): Promise<SessionCurrentResponse> {
        const { data } = await this.#axios.get<SessionCurrentResponse>("/session/current")
        return data
    }

    async getSessions(): Promise<SessionListResponse> {
        const { data } = await this.#axios.get<SessionListResponse>("/session/sessions")
        return data
    }

    async deleteSession(sessionId: string) {
        await this.#axios.post<GenericSuccess>("/session/logout", {
            session: sessionId
        })
    }
}