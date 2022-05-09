export type JwtPayload = {
    username: string,
    role: string
}

export type MakeReservation = {
    host: string,
    start: Date, 
    end: Date 
}

export type Login = {
    username: string,
    password: string
}