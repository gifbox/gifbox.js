import { FavoriteURL } from "../types/Structures.js"
import { GenericSuccess, UserFavoritesResponse, UserQueryResponse, UserRegisterResponse } from "../types/Responses.js"
import { ClientAxios } from "./Axios.js"
import { User } from "./User.js"

/**
 * User-related functions. Corresponds to the /user API route.
 */
export class UserFunctions {
    #axios: ClientAxios

    /** Intended to be instantiated internally by {@link Client}. */
    constructor(axios: ClientAxios) {
        this.#axios = axios
    }

    /** Create an instance of this class. Intended for internal use by {@link Client} */
    static instantiate(axios: ClientAxios) {
        return new UserFunctions(axios)
    }

    /** Create a new user account. */
    async register(username: string, email: string, password: string): Promise<User> {
        const {
            data: { avatar, displayName, description }
        } = await this.#axios.post<UserRegisterResponse>("/user/register", {
            username, email, password
        })

        return new User(avatar, displayName, username, description, false)
    }

    /** Get information about a user given their username. */
    async query(username: string): Promise<UserQueryResponse> {
        const { data } = await this.#axios.get<UserQueryResponse>(`/user/${username}`)
        return data
    }

    /** Get current user's favorite URLs. */
    async favorites(): Promise<UserFavoritesResponse> {
        const { data } = await this.#axios.get<UserFavoritesResponse>("/user/favorites")
        return data
    }

    /** Add to current user's favorite URLs. */
    async favorite(url: string): Promise<FavoriteURL> {
        const { data } = await this.#axios.post<FavoriteURL>("/user/favorites", {
            url
        })
        return data
    }

    /** Delete from current user's favorite URLs */
    async unfavorite(favoriteId: string): Promise<GenericSuccess> {
        const { data } = await this.#axios.delete<GenericSuccess>(`/user/favorites/${favoriteId}`)
        return data
    }
}