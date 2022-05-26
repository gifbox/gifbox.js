import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

export class ClientAxios {
    private axios: AxiosInstance

    constructor(baseURL: string) {
        this.axios = axios.create({
            baseURL: baseURL
        })
    }

    setBearerToken(token: string) {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }

    unsetBearerToken() {
        delete this.axios.defaults.headers.common["Authorization"]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get<T = any, R = AxiosResponse<T>>(path: string, config?: AxiosRequestConfig) {
        return this.axios.get<T, R>(path, config)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post<T = any, R = AxiosResponse<T>>(path: string, data?: any, config?: AxiosRequestConfig) {
        return this.axios.post<T, R>(path, data, config)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete<T = any, R = AxiosResponse<T>>(path: string, config?: AxiosRequestConfig) {
        return this.axios.delete<T, R>(path, config)
    }
}