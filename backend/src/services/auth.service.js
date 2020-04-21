const { generateToken } = require('../helpers/jwt.helper')
let _userService = null
let _userOBJ = null

class AuthService {
  constructor ({ UserService, User }) {
    _userService = UserService
    _userOBJ = User
  }

  async signUp (user) {
    const { email } = user
    const userExist = await _userService.getUserByemail(email)
    // console.log(userExist)

    if (userExist) {
      const error = new Error()
      error.status = 400
      error.message = 'User already exists'
      throw error
    }
    if (!userExist) {
      const usuario = await _userOBJ.pre(user)
      // console.log('llego aqui usuario')
      // console.log(usuario)
      return await _userService.create(usuario)
    }
  }

  async signIn (user) {
    // cogemos el email y la contraseña
    const { email, password } = user
    const userExist = await _userService.getUserByemail(email)
    if (!userExist) {
      const error = new Error()
      error.status = 402
      error.message = 'User does not exists'
      throw error
    }

    const UserPas = userExist[0].password
    // console.log(UserPas)
    // const usuario = await _userOBJ.pre(user);
    //comporbamos las contraseñas
    const validPassword = await _userOBJ.comparePasswords(UserPas, password)
    // console.log(validPassword)

    if (!validPassword) {
      const error = new Error()
      error.status = 400
      error.message = 'Invalid Password'
      throw error
    }
    // poner los elementos que queremos que contenta el token
    const usertToEncode = {
      email: userExist[0].email,
      id: userExist[0].idUsu,
      alias: userExist[0].alias
    }
    // generamos el token
    const token = generateToken(usertToEncode)

    // podria ser  return { token, user:userExist};
    return { token, user: usertToEncode }
    // return { token, user: userExist };
  }
}

module.exports = AuthService
