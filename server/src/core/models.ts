export interface JwtPayload {
    username: string;
    role: string;
}

export interface MakeReservationRequest {
    host: string;
    start: Date;
    end: Date;
}

export interface LoginRequest {
    username: string;
    password: string;
}