const BaseService = require('./base.service')
let _UserObj = null
let _HeroObj = null

/**
 * Admin class service, Our services indicated what actions should be taken according to the data that we receive from the different requests to our api controller
 */
class AdminService extends BaseService {
  /**
   * @param {class} Hero insert our Hero class
   * @param {class} User insert our User class
   */
  constructor({ User, Hero }) {
    super(User, Hero)
    _UserObj = User
    _HeroObj = Hero
  }

  /**
   * New hero in db
   * @param {object} entity
   * @returns {string}  message
   */
  async newHero(entity) {
    if (!entity) {
      const error = new Error()
      error.status = 400
      error.message = 'entity must be sent'
      throw error
    }
    return await _HeroObj.newHero(entity)
  }

  /**
   * Modify hero
   * @param {number} idHero
   * @param {object} entity
   * @returns {string}  message
   */
  async modifyHero(idHero, entity) {
    if (!idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'idHero must be sent'
      throw error
    }
    if (!entity) {
      const error = new Error()
      error.status = 400
      error.message = 'entity must be sent'
      throw error
    }
    return await _HeroObj.modifyHero(idHero, entity)
  }

  /**
   * Delete user
   * @param {number} idUsu
   * @returns {string}  message
   */
  async deleteUser(idUsu) {
    if (!idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'idUsu must be sent'
      throw error
    }
    return await _UserObj.deleteUser(idUsu)
  }

  /**
   * Get all users from db
   * @returns {Array}  users
   */
  async allUsers() {
    const currentEntity = await _UserObj.allUsers()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'Entity must be sent'
      throw error
    }
    return currentEntity
  }

  /**
  * Get users count from db
  * @returns {Array}  users
  */
  async countAllUsers() {
    const currentEntity = await _UserObj.countAllUsers()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'Entity must be sent'
      throw error
    }
    return currentEntity
  }

  /**
* Get teams count from db
* @returns {Array}  users
*/
  async countAllTeams() {
    const currentEntity = await _UserObj.countAllTeams()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'Entity must be sent'
      throw error
    }
    return currentEntity
  }

  /**
* Get heroes count from db
* @returns {Array}  users
*/
  async countAllHeroes() {
    const currentEntity = await _UserObj.countAllHeroes()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'Entity must be sent'
      throw error
    }
    return currentEntity
  }

}

module.exports = AdminService
