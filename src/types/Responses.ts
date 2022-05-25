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