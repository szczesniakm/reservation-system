import { BadRequestError } from "../errors";

export const users = [
    { username: 'test1', password: 'dsadsadsa', role: 'admin'},
    { username: 'student', password: '314wo', role: 'stud'}
];

export const verifyCredentials = async (username: string, password: string) => {
    const user = users.find( u => u.username == username && u.password == password);
    if(!user) {
        throw new BadRequestError('Nieprawidłowa nazwa użytkownika lub hasło.');
    }

    return {
        username: user.username,
        role: user.role
    };
};

