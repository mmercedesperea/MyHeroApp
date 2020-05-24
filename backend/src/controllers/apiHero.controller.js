let _apiHeroService = null
/**
 * Api hero class with controllers functions
 */
class ApiHeroController {
  /**
   *
   * @param {class} ApiHeroService insert our api service in our class
   */
  constructor ({ ApiHeroService }) {
    _apiHeroService = ApiHeroService
  }

  /**
   * Get hero by name
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {array}  heroes
   */
  async get (req, res) {
    const { name } = req.params
    const hero = await _apiHeroService.get(name)
    return res.json(hero)
  }

  /**
   * get hero by id
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  hero
   */
  async getHeroByid (req, res) {
    const { id } = req.params
    const hero = await _apiHeroService.getHeroByid(id)
    return res.json(hero)
  }

  /**
   * Get all heroes
   * @param {Object} res - Express response object
   * @returns {array}  heroes
   */
  async searchAllHeroes (req, res) {
    const hero = await _apiHeroService.searchAllHeroes()
    return res.json(hero)
  }
}

module.exports = ApiHeroController
