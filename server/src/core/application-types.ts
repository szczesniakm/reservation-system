export type JwtPayload = {
    username: string,
    role: string
}

export type MakeReservationRequest = {
    host: string,
    start: Date, 
    end: Date 
}

export type LoginRequest = {
    username: string,
    password: string
}