import { FavoriteURL, FileInformation } from "./Structures.js"

export type GenericSuccess = {
    success: true
}

export type UserSelfResponse = {
    avatar: object | null,
    displayName: string,
    username: string,
    email: string,
    description: string,
    verified: boolean
}

export type SessionCreateResponse = {
    sessionName: string,
    token: string
}

export type SessionCurrentResponse = {
    _id: string,
    sessionName: string,
    token: string,
    userId: string
}

export type SessionListResponse = Omit<SessionCurrentResponse, "token" | "userId">[]

export type UserRegisterResponse = {
    _id: string,
    displayName: string,
    username: string,
    email: string,
    description: string,
    avatar: null
}

export type UserQueryResponse = {
    _id: string,
    displayName: string,
    username: string,
    description: string,
    verified: boolean,
    avatar: FileInformation | null
}

export type UserFavoritesResponse = FavoriteURL[]

export type PostNewResponse = {
    _id: string,
    title: string,
    slug: string,
    author: {
        _id: string,
        displayName: string,
        username: string,
        description: string,
        verified: boolean,
        avatar: FileInformation | null
    },
    tags: string[],
    file: FileInformation,
    private: boolean,
    createdAt: number
}

export type PostPopularResponse = {
    _id: string,
    title: string,
    slug: string,
    author: {
        _id: string,
        displayName: string,
        username: string,
        description: string,
        verified: boolean,
        avatar: FileInformation | null
    },
    tags: string[],
    file: {
        fileName: string,
        size: number
    },
    createdAt: number
}[]

export type PostSearchResponse = {
    hits: {
        _id: string,
        title: string,
        slug: string,
        author: {
            _id: string,
            displayName: string,
            username: string,
            description: string,
            verified: boolean,
            avatar: FileInformation | null
        },
        tags: string[],
        file: FileInformation,
        createdAt: number
    }[],
    tookMs: number,
    numHits: number,
    numHitsApprox: boolean
}

export type PostInfoResponse = {
    _id: string,
    title: string,
    slug: string,
    author: {
        _id: string,
        displayName: string,
        username: string,
        description: string,
        verified: boolean,
        avatar: FileInformation | null
    },
    tags: string[],
    file: {
        fileName: string,
        size: number
    },
    createdAt: number
}