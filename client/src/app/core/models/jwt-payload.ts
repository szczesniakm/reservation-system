export interface JWTPayload {
    username: string;
    role: string;
    iat: string;
    exp: string;
    iss: string;
}