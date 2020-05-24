_HeroObj = null

/**
 * Api class service, Our services indicated what actions should be taken according to the data that we receive from the different requests to our api controller
 */
class ApiHeroService {
  /**
   * @param {class} Hero insert our Hero class
   */
  constructor ({ Hero }) {
    _HeroObj = Hero
  }

  /**
   * Get hero by name
   * @param {string} name
   * @returns {array}  heroes
   */
  async get (name) {
    if (!name) {
      const error = new Error()
      error.status = 400
      error.message = 'Name must be sent'
      throw error
    }
    return await _HeroObj.getHeroByName(name)
  }

  /**
   * Get hero by id
   * @param {number} id
   * @returns {object}  heroe
   */
  async getHeroByid (id) {
    if (!id) {
      const error = new Error()
      error.status = 400
      error.message = 'Id must be sent'
      throw error
    }
    return await _HeroObj.getHeroByid(id)
  }

  /**
   * Get all heros from api
   * @returns {array}  heroes
   */
  async searchAllHeroes () {
    return await _HeroObj.searchAllHeroes()
  }
}

module.exports = ApiHeroService
