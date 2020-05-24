let _adminService = null
/**
 * Admin class with controllers functions
 */
class AdminController {
  /**
   *
   * @param {class} AdminService insert our Admin service in our class
   */
  constructor ({ AdminService }) {
    _adminService = AdminService
  }
  /**
   * new hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async newHero (req, res) {
    const { body } = req
    const newHero = await _adminService.newHero(body)
    return res.status(201).send({ message: newHero })
  }

  /**
   * Get all users
   * @param {Object} res - Express response object
   * @returns {array}  Users
   */
  async allUsers (req, res) {
    const allUsers = await _adminService.allUsers()
    return res.json(allUsers)
  }

  /**
   * Modify hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async modifyHero (req, res) {
    const { idHero } = req.params
    const { body } = req
    const modifyHero = await _adminService.modifyHero(idHero, body)
    console.log(modifyHero)
    return res.status(201).send({ message: modifyHero })
  }

  /**
   * Delete user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async deleteUser (req, res) {
    const { idUsu } = req.params
    const deleteUser = await _adminService.deleteUser(idUsu)
    return res.status(201).send({ message: deleteUser })
  }
}

module.exports = AdminController
