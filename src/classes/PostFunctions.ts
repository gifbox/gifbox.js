import { createFormData } from "lib/FormData.js"
import { GenericSuccess, PostInfoResponse, PostNewResponse, PostPopularORSearchResponse, } from "types/Responses.js"
import { ClientAxios } from "./Axios.js"

export class PostFunctions {
    #axios: ClientAxios

    constructor(axios: ClientAxios) {
        this.#axios = axios
    }

    static instantiate(axios: ClientAxios) {
        return new PostFunctions(axios)
    }

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

    async deletePost(id: string) {
        const { data } = await this.#axios.delete<GenericSuccess>(`/post/${id}`)
        return data
    }

    async popularPosts(limit: number, skip: number) {
        const {
            data
        } = await this.#axios.get<PostPopularORSearchResponse>(`/post/popular?limit=${limit ?? 10}&skip=${skip ?? 0}`)
        return data
    }

    async queryPost(id: string) {
        const { data } = await this.#axios.get<PostInfoResponse>(`/post/info/${id}`)
        return data
    }

    async searchPosts(query: string, limit: number, skip: number) {
        const { data } = await this.#axios.post<PostPopularORSearchResponse>("/post/search", {
            query, skip, limit
        })
        return data
    }
}