let _authService = null
/**
 * Auth class with controllers functions
 */
class AuthController {
  /**
   *
   * @param {class} AuthService insert our auth service in our class
   */
  constructor ({ AuthService }) {
    _authService = AuthService
  }

  /**
   * signUp user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async signUp (req, res) {
    const { body } = req
    const createUser = await _authService.signUp(body)
    console.log(createUser)
    return res.status(201).send({ message: createUser })
  }

  /**
   * signIn user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  token
   */
  async signIn (req, res) {
    const { body } = req
    const creds = await _authService.signIn(body)
    return res.json(creds)
  }
}

module.exports = AuthController
