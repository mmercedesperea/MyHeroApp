let _userService = null

/**
 * Class with User controllers functions
 */
class UserController {
  /**
   *
   * @param {class} UserService insert our user service in our class
   */
  constructor({ UserService }) {
    _userService = UserService
  }

  /**
   * Get a user by id
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  user
   */
  async get(req, res) {
    const { idUsu } = req.params

    const user = await _userService.get(idUsu)
    user[0].password = '0'
    return res.json(user[0])
  }

  /**
   * update a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async update(req, res) {
    const { idUsu } = req.params
    const { body } = req
    const updateUser = await _userService.update(idUsu, body)
    return res.status(201).send({ message: updateUser })
  }

  /**
   * update a user pass
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async updatePass(req, res) {
    const { idUsu } = req.params
    const { body } = req
    const updatePass = await _userService.updatePass(idUsu, body)
    return res.status(201).send({ message: updatePass })
  }

  /**
   * delete a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async delete(req, res) {
    const { idUsu } = req.params
    const { body } = req
    const deleteUser = await _userService.deleteUser(idUsu, body)
   
    return res.status(201).send({ message: deleteUser })
  }

  /**
   * follow a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async followUser(req, res) {
    const { body } = req
    const followUser = await _userService.followUser(body)
   
    return res.status(201).send({ message: followUser })
  }

  /**
   * Unfollow a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async unFollowUser(req, res) {
    const { idUsu } = req.params
    const { idUnfollow } = req.params
    const unFollowUser = await _userService.unFollowUser(idUsu, idUnfollow)
    return res.status(201).send({ message: unFollowUser })
  }

  /**
   * search user by name
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {(Array | null)}  user or null
   */
  async getUserByName(req, res) {
    const { userName } = req.params
    const user = await _userService.getUserByName(userName)
    return res.json(user)
  }

  /**
   * check users relationship
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
    * @returns {(object | null)}  user or null
   */
  async checkFollow(req, res) {
    const { idUsu } = req.params
    const { idUnfollow } = req.params
    const checkFollow = await _userService.checkFollow(idUsu, idUnfollow)
    return res.json(checkFollow)
  }

  /**
   * followed users
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {(Array | null)}  user or null
   */
  async getFollowUsers(req, res) {
    const { idUsu } = req.params
    const FollowUsers = await _userService.getFollowUsers(idUsu)
    return res.json(FollowUsers)
  }

  /**
   * followers users
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  users followers
   */
  async getFollowersUsers(req, res) {
    const { idUsu } = req.params
    const FollowUsers = await _userService.getFollowersUsers(idUsu)
    return res.json(FollowUsers)
  }

  /**
   * update img
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async newImg(req, res) {
    const { body } = req
    const updateImg = await _userService.newImg(body)
    return res.status(201).send({ message: updateImg })
  }
}
module.exports = UserController
