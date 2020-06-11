let _adminService = null
/**
 * Admin class with controllers functions
 */
class AdminController {
  /**
   *
   * @param {class} AdminService insert our Admin service in our class
   */
  constructor({ AdminService }) {
    _adminService = AdminService
  }
  /**
   * new hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async newHero(req, res) {
    const { body } = req
    const newHero = await _adminService.newHero(body)
    return res.status(201).send({ message: newHero })
  }

  /**
   * Get all users
   * @param {Object} res - Express response object
   * @returns {array}  Users
   */
  async allUsers(req, res) {
    const allUsers = await _adminService.allUsers()
    return res.json(allUsers)
  }

  /**
   * Modify hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async modifyHero(req, res) {
    const { idHero } = req.params
    const { body } = req
    const modifyHero = await _adminService.modifyHero(idHero, body)
    
    return res.status(201).send({ message: modifyHero })
  }

  /**
   * Delete user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async deleteUser(req, res) {
    const { idUsu } = req.params
    const deleteUser = await _adminService.deleteUser(idUsu)
    return res.status(201).send({ message: deleteUser })
  }

  /**
 * Get users count
 * @param {Object} res - Express response object
 * @returns {number}  Users
 */
  async countAllUsers(req, res) {
    const allUsers = await _adminService.countAllUsers()
    return res.json(allUsers[0].users)
  }

  /**
 * Get teams count
 * @param {Object} res - Express response object
 * @returns {number}  teams
 */
  async countAllTeams(req, res) {
    const allUsers = await _adminService.countAllTeams()
    return res.json(allUsers[0].teams)
  }

  /**
 * Get heroes count
 * @param {Object} res - Express response object
 * @returns {number}  Users
 */
  async countAllHeroes(req, res) {
    const allUsers = await _adminService.countAllHeroes()
    return res.json(allUsers[0].heroes)
  }
}

module.exports = AdminController
