const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const createToken = require("../services/jwt.service");

const users = [
    { username: 'test1', password: 'dsadsadsa', role: 'admin'},
    { username: 'student', password: '314wo', role: 'stud'}
];

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        throw new CustomError.CustomError('Login and password can not be empty.');
    }

    const user = users.find(u => u.username == username && u.password == password);

    if(!user) {
        throw new CustomError.BadRequestError('Invalid credentials.');
    }

    const token = createToken(username, user.role);

    res.status(StatusCodes.OK).json({ token: token })
}

module.exports = { login };