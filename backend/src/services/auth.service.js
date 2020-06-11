const { generateToken } = require('../helpers/jwt.helper')
let _userService = null
let _userOBJ = null

/**
 * Auth class service, Our services indicated what actions should be taken according to the data that we receive from the different requests to our api controller
 */
class AuthService {
  /**
   *
   * @param {class} UserService
   * @param {class} User
   */
  constructor({ UserService, User }) {
    _userService = UserService
    _userOBJ = User
  }

  /**
   * signUp user
   * @param {Object} user
   * @returns {string}  message
   */
  async signUp(user) {
    const { email } = user
    const userExist = await _userService.getUserByemail(email)
    if (userExist) {
      const error = new Error()
      error.status = 400
      error.message = 'User already exists'
      throw error
    }
    if (!userExist) {
      const usuario = await _userOBJ.pre(user)
      return await _userService.create(usuario)
    }
  }

  /**
   * signIn user
   * @param {Object} user
   * @returns {object}  token
   */
  async signIn(user) {
    const { email, password } = user
    const userExist = await _userService.getUserByemail(email)
    if (!userExist) {
      const error = new Error()
      error.status = 402
      error.message = 'User does not exists'
      throw error
    }

    const UserPas = userExist[0].password
    const validPassword = await _userOBJ.comparePasswords(UserPas, password)

    if (!validPassword) {
      const error = new Error()
      error.status = 400
      error.message = 'Invalid Password'
      throw error
    }

    // put the elements we want the token to contain
    const usertToEncode = {
      email: userExist[0].email,
      id: userExist[0].idUsu,
      alias: userExist[0].alias,
      admin: userExist[0].admin,
      photo: userExist[0].photo
    }
    // create the token
    const token = generateToken(usertToEncode)

    return { token, user: usertToEncode }
  }
}

module.exports = AuthService
