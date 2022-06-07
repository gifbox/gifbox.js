import { createFormData } from "../lib/FormData.js"
import { GenericSuccess, PostInfoResponse, PostNewResponse, PostPopularResponse, PostSearchResponse, } from "../types/Responses.js"
import { ClientAxios } from "./Axios.js"

/**
 * Post-related functions. Corresponds to the /post API route.
 */
export class PostFunctions {
    #axios: ClientAxios

    /** Intended to be instantiated internally by {@link Client}. */
    constructor(axios: ClientAxios) {
        this.#axios = axios
    }

    /** Create an instance of this class. Intended for internal use by {@link Client} */
    static instantiate(axios: ClientAxios) {
        return new PostFunctions(axios)
    }

    /** Create a new post. gifData should be an animated image in gif format that {@link FormData} understands. */
    async createPost(title: string, tags: string[], gifData: never) {
        const formData = await createFormData()
        formData.append("title", title)
        for (const tag of tags) {
            formData.append("tags[]", tag)
        }
        formData.append("file", gifData)

        const { data } = await this.#axios.post<PostNewResponse>("/post/new", formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return data
    }

    /** Delete a post provided its ID. The requester must be the original uploader. */
    async deletePost(id: string) {
        const { data } = await this.#axios.delete<GenericSuccess>(`/post/${id}`)
        return data
    }

    /**
     * Fetch a list of currently popular posts, best used with infinite scroll.
     * @param limit Limit, up to 50
     */
    async popularPosts(limit: number, skip: number) {
        const {
            data
        } = await this.#axios.get<PostPopularResponse>(`/post/popular?limit=${limit ?? 10}&skip=${skip ?? 0}`)
        return data
    }

    /** Fetch a post provided its ID. */
    async queryPost(id: string) {
        const { data } = await this.#axios.get<PostInfoResponse>(`/post/info/${id}`)
        return data
    }

    /**
     * Search for posts provided a query. Typo-tolerant.
     * @param limit Limit, up to 50
     */
    async searchPosts(query: string, limit: number, skip: number) {
        const encodedQuery = encodeURIComponent(query)
        const { data } = await this.#axios.get<PostSearchResponse>(`/post/search?query=${encodedQuery}&limit=${limit}&skip=${skip}`)
        return data
    }
}