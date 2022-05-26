import { UserQueryResponse, UserRegisterResponse } from "types/Responses.js"
import { ClientAxios } from "./Axios.js"
import { User } from "./User.js"

export class UserFunctions {
    #axios: ClientAxios

    constructor(axios: ClientAxios) {
        this.#axios = axios
    }

    static instantiate(axios: ClientAxios) {
        return new UserFunctions(axios)
    }

    async register(username: string, email: string, password: string): Promise<User> {
        const {
            data: { avatar, displayName, description }
        } = await this.#axios.post<UserRegisterResponse>("/user/register", {
            username, email, password
        })

        return new User(avatar, displayName, username, description, false)
    }

    async query(username: string): Promise<UserQueryResponse> {
        const { data } = await this.#axios.get<UserQueryResponse>(`/user/${username}`)
        return data
    }
}