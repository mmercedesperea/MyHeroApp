const { generateToken } = require('../helpers/jwt.helper');
let _userService = null;
let _userOBJ = null;

class AuthService {
    constructor({ UserService }) {
        _userService = UserService;
        // _userOBJ = User;
    }

    async signUp(user) {
        // const { email } = user;
        // const userExist = await _userService.getUserByemail(email);
        // if (userExist) {
        //     const error = new Error();
        //     error.status = 400;
        //     error.message = "User already exists";
        //     throw error;
        // }

        // if (!userExist) {
            // _userOBJ.pre(user);
        // }

        return await _userService.create(user);


    }

    async signIn(user) {
        const { email, password } = user;
        const userExist = await _userService.getUserByemail(email);
        if (!userExist) {
            const error = new Error();
            error.status = 402;
            error.message = "User does not exists";
            throw error;
        }


        const validPassword = userExist.comparePasswords(password);
        if (!validPassword) {
            const error = new Error();
            error.status = 400;
            error.message = "Invalid Password";
            throw error;
        }

        // poner los elementos que queremos que contenta el token
        const usertToEncode = {
            email: userExist.email,
            id: userExist.idUsu
        };

        const token = generateToken(usertToEncode);


        // podria ser  return { token, user:userExist};
        // return { token, user:  usertToEncode};
        return { token, user: userExist };
    }

}


module.exports = AuthService;