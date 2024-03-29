import { SelfUpdateObject, SessionUpdateObject } from "../types/Requests.js"
import { ClientOptions } from "../index.js"
import { UserSelfResponse, SessionCreateResponse, GenericSuccess, SessionListResponse, SessionCurrentResponse } from "../types/Responses.js"
import { FileInformation } from "../types/Structures.js"
import { ClientAxios } from "./Axios.js"
import { ClientUser } from "./ClientUser.js"
import { PostFunctions } from "./PostFunctions.js"
import { UserFunctions } from "./UserFunctions.js"
import { createFormData } from "../lib/FormData.js"

/**
 * GIFBox API Client
 */
export class Client {
    /** Currently used Bearer authorization token. */
    #bearerToken: string | null = null
    /** Instance of Axios. */
    #axios: ClientAxios
    /** User the client is authorized as. */
    #clientUser: ClientUser | null = null

    constructor(clientOptions?: ClientOptions) {
        const options = clientOptions ?? {
            baseURL: "https://api.gifbox.me",
        }
        this.#axios = new ClientAxios(options.baseURL)
    }

    /** Currently used Bearer authorization token. */
    get token() {
        return this.#bearerToken
    }

    /** Update the currently used client user. */
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

    /** User the client is authorized as. */
    get clientUser() {
        return this.#clientUser
    }

    /** User-related functions. Corresponds to the /user API route. */
    get user(): UserFunctions {
        return UserFunctions.instantiate(this.#axios)
    }

    /** Post-related functions. Corresponds to the /post API route. */
    get post(): PostFunctions {
        return PostFunctions.instantiate(this.#axios)
    }

    /** Login with an already existent session token. */
    async loginBearer(token: string) {
        this.#axios.setBearerToken(token)
        this.#bearerToken = token
        await this.#updateClientUser()
    }

    /**
     * Login as existent user if there is no token present yet.
     * @param sessionName Name of the new session, will be displayed to the user.
     */
    async createSession(email: string, password: string, sessionName: string) {
        const { data } = await this.#axios.post<SessionCreateResponse>("/session/create", {
            email, password, sessionName
        })
        await this.loginBearer(data.token)
    }

    /** Log out, then reset token and client user to `null`. */
    async logout() {
        const session = await this.getCurrentSession()
        await this.deleteSession(session._id)

        this.#clientUser = null
        this.#bearerToken = null
    }

    /** Fetch information about the currently used session */
    async getCurrentSession(): Promise<SessionCurrentResponse> {
        const { data } = await this.#axios.get<SessionCurrentResponse>("/session/current")
        return data
    }

    /** Get sessions that exist on the account. */
    async getSessions(): Promise<SessionListResponse> {
        const { data } = await this.#axios.get<SessionListResponse>("/session/sessions")
        return data
    }

    /** Delete an existing session. */
    async deleteSession(sessionId: string) {
        await this.#axios.delete<GenericSuccess>(`/session/${sessionId}`)
    }

    /** 
     * Modify an existing session.
     * @param overwriteWith Object with updated properties, all keys optional
     */
    async modifySession(sessionId: string, overwriteWith: SessionUpdateObject) {
        await this.#axios.patch<GenericSuccess>(`/session/${sessionId}`, overwriteWith)
    }

    /**
     * Modify the currently logged in user
     * @param overwriteWith Object with updated properties, all keys optional
     */
    async modifySelf(overwriteWith: SelfUpdateObject) {
        await this.#axios.patch<UserSelfResponse>("/user/self", overwriteWith)
        await this.#updateClientUser()
    }

    /** Set a new avatar. `avatar` should be a common-format image that {@link FormData} understands. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async setAvatar(avatar: any) {
        const formData = await createFormData()
        formData.append("file", avatar)

        const { data } = await this.#axios.post<GenericSuccess>("/user/avatar", formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return data
    }

    /** Unset the current avatar. */
    async unsetAvatar() {
        const { data } = await this.#axios.delete<GenericSuccess>("/user/avatar")
        return data
    }
}