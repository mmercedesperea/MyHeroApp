const BaseService = require('./base.service')
let _heroOBJ = null

/**
 * Hero class service, Our services indicated what actions should be taken according to the data that we receive from the different requests to our api controller
 */
class HeroService extends BaseService {
  /**
   * @param {class} Hero insert our Hero class
   */
  constructor ({ Hero }) {
    super(Hero)
    _heroOBJ = Hero
  }

  /**
   * Get hero winner
   *  @param {number} idHero
   *  @param {number} idHero2
   * @returns {object }  hero
   */
  async getWinner (idHero, idHero2) {
    if (!idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'idHero must be sent'
      throw error
    }

    if (!idHero2) {
      const error = new Error()
      error.status = 400
      error.message = 'idHero2 must be sent'
      throw error
    }
    return await _heroOBJ.getWinner(idHero, idHero2)
  }

  /**
   * Get most intelligence hero
   * @returns {object }  hero
   */
  async mostIntelligence () {
    const currentEntity = await _heroOBJ.mostIntelligence()

    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Get most strength hero
   * @returns {object }  hero
   */
  async mostStrength () {
    const currentEntity = await _heroOBJ.mostStrength()

    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Get most speed hero
   * @returns {object }  hero
   */
  async mostSpeed () {
    const currentEntity = await _heroOBJ.mostSpeed()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Get most durability hero
   * @returns {object }  hero
   */
  async mostDurability () {
    const currentEntity = await _heroOBJ.mostDurability()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Get most power hero
   * @returns {object }  hero
   */
  async mostPower () {
    const currentEntity = await _heroOBJ.mostPower()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Get most combat hero
   * @returns {object }  hero
   */
  async mostCombat () {
    const currentEntity = await _heroOBJ.mostCombat()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Get new heros
   * @returns {Array }  heroes
   */
  async newHeros () {
    const currentEntity = await _heroOBJ.newHeros()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Get all marvel heroes
   * @returns {Array }  heroes
   */
  async allMarvelHeroes () {
    const currentEntity = await _heroOBJ.allMarvelHeroes()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Get allDC heroes
   * @returns {Array }  heroes
   */
  async allDCHeroes () {
    const currentEntity = await _heroOBJ.allDCHeroes()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Get hero img for user profile
   * @returns {Array }  heroes
   */
  async profileImgHeroes () {
    const currentEntity = await _heroOBJ.profileImgHeroes()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Search hero by name
   * @param {string} name
   * @returns {Array }  heroes
   */
  async searchHeroByName (name) {
    if (!name) {
      const error = new Error()
      error.status = 400
      error.message = 'Name must be sent'
      throw error
    }
    return await _HeroObj.searchHeroByName(name)
  }
}

module.exports = HeroService
