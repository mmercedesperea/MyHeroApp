let _heroService = null

/**
 * Hero class with controllers functions
 */
class HeroController {
  /**
   *
   * @param {class} HeroService insert our hero service in our class
   */
  constructor({ HeroService }) {
    _heroService = HeroService
  }

  /**
   * Get hero by id
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  hero
   */
  async get(req, res) {
    const { idHero } = req.params
    const hero = await _heroService.get(idHero)
    return res.json(hero)
  }
  /**
   * Get winner hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  hero
   */
  async getWinner(req, res) {
    const { idHero } = req.params
    const { idHero2 } = req.params
    const heroWin = await _heroService.getWinner(idHero, idHero2)
    return res.json(heroWin)
  }

  /**
   * Get most intelligent hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  hero
   */
  async mostIntelligence(req, res) {
    const mostI = await _heroService.mostIntelligence()
    return res.json(mostI[0])
  }

  /**
   * Get strongest hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  hero
   */
  async mostStrength(req, res) {
    const mostS = await _heroService.mostStrength()
    return res.json(mostS[0])
  }

  /**
   * Get fastest hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  hero
   */
  async mostSpeed(req, res) {
    const mostSp = await _heroService.mostSpeed()
    return res.json(mostSp[0])
  }

  /**
   * Get hero with most durability 
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  hero
   */
  async mostDurability(req, res) {
    const mostD = await _heroService.mostDurability()
    return res.json(mostD[0])
  }

  /**
   * Get most powerful hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  hero
   */
  async mostPower(req, res) {
    const mostP = await _heroService.mostPower()
    return res.json(mostP[0])
  }

  /**
   * Get hero with highest combat stats
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  hero
   */
  async mostCombat(req, res) {
    const mostC = await _heroService.mostCombat()
    return res.json(mostC[0])
  }

  /**
   * Get new heroes in the db
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  heros
   */
  async newHeros(req, res) {
    const mostC = await _heroService.newHeros()
    return res.json(mostC)
  }

  /**
   * All marvel heroes
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  heros
   */
  async allMarvelHeroes(req, res) {
    const allMarvel = await _heroService.allMarvelHeroes()
    //    JSON.stringify(user)
    return res.json(allMarvel)
  }

  /**
   * All dc heroes
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  heros
   */
  async allDCHeroes(req, res) {
    const allDC = await _heroService.allDCHeroes()
    //    JSON.stringify(user)
    return res.json(allDC)
  }

  /**
   * Get hero img for user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  heros img
   */
  async profileImgHeroes(req, res) {
    const profileImg = await _heroService.profileImgHeroes()
    return res.json(profileImg)
  }

  /**
   * Search hero by name
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  heros img
   */
  async searchHeroByName(req, res) {
    const { name } = req.params
    const hero = await _heroService.searchHeroByName(name)
    return res.json(hero)
  }
}

module.exports = HeroController
