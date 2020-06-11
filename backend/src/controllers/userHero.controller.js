let _userHeroService = null

/**
 * Class with User hero controllers functions
 */
class UserHeroController {
  /**
   *
   * @param {class} UserHeroService insert our userHero service in our class
   */
  constructor({ UserHeroService }) {
    _userHeroService = UserHeroService
  }

  /**
   * follow hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async followHero(req, res) {
    const { body } = req
    const followHero = await _userHeroService.followHero(body)
    return res.status(201).send({ message: followHero })
  }

  /**
   * unfollow hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async unfollowHero(req, res) {
    const { body } = req
    const unfollowHero = await _userHeroService.unfollowHero(body)
    return res.status(201).send({ message: unfollowHero })
  }

  /**
   * favorite a hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async favorite(req, res) {
    const { body } = req
    const favorite = await _userHeroService.favorite(body)
    return res.status(201).send({ message: favorite })
  }

  /**
   * unfavorite a hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async unfavorite(req, res) {
    const { body } = req
    const unfavorite = await _userHeroService.unfavorite(body)
    return res.status(201).send({ message: unfavorite })
  }

  /**
   * vote a hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async voteHero(req, res) {
    const { body } = req
    const voteHero = await _userHeroService.voteHero(body)
    return res.status(201).send({ message: voteHero })
  }

  /**
   * comment a hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async commentHero(req, res) {
    const { body } = req
    const commentHero = await _userHeroService.commentHero(body)
    // console.log( commentHero)
    return res.status(201).send({ message: commentHero })
  }

  /**
   * delete a hero's comment
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async deleteCHero(req, res) {
    const { body } = req
    const deleteCHero = await _userHeroService.deleteCHero(body)
    return res.status(201).send({ message: deleteCHero })
  }

  /**
   * Get all favorites heroes
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  heroes
   */
  async allHerosFav(req, res) {
    const { idUsu } = req.params
    const allHeros = await _userHeroService.getFav(idUsu)
    return res.json(allHeros)
  }

  /**
   * Get all following heroes
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  heroes
   */
  async allHerosFoll(req, res) {
    const { idUsu } = req.params
    const allHeros = await _userHeroService.get(idUsu)
    //    JSON.stringify(user)
    return res.json(allHeros)
  }

  /**
   * Get a user's comment about a hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  heroes
   */
  // Get user's comment on a hero
  async getCommentHero(req, res) {
    const { idUsu } = req.params
    const { idHero } = req.params
    const allHeros = await _userHeroService.getCommentHero(idUsu, idHero)
    return res.json(allHeros)
  }

  /**
   * Get the relationship of the hero and the user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {(object | null)}  hero or null
   */
  async getHeroUsu(req, res) {
    const { idUsu } = req.params
    const { idHero } = req.params
    const allHeros = await _userHeroService.getHeroUsu(idUsu, idHero)
    //    JSON.stringify(user)
    return res.json(allHeros)
  }

  /**
   * Get the comment of the hero and the user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  heroes user comment
   */
  async getVoteHero(req, res) {
    const { idUsu } = req.params
    const { idHero } = req.params
    const allHeros = await _userHeroService.getVoteHero(idUsu, idHero)
    return res.json(allHeros)
  }

  /**
   * Get best marvel hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {array}  best marvel heros
   */
  async bestMarverHero(req, res) {
    const bestM = await _userHeroService.bestMarverHero()
    return res.json(bestM)
  }

  /**
   * Get best dc hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {array}  best dc heros
   */
  async bestDCHero(req, res) {
    const bestDC = await _userHeroService.bestDCHero()
    return res.json(bestDC)
  }

  /**
 * Get best other hero
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {array}  best other heros
 */
  async bestOTHero(req, res) {
    const bestot = await _userHeroService.bestOTHero()
    return res.json(bestot)
  }
  /**
   * Most followed heroes
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {array}  heroes
   */
  async mostFollowHeros(req, res) {
    const mostF = await _userHeroService.mostFollowHeros()
    return res.json(mostF)
  }

  /**
   * Get all the comments from a hero
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {(Array | null)}  heroes
   */
  async getHeroComments(req, res) {
    const { idHero } = req.params
    const allComments = await _userHeroService.getHeroComments(idHero)
    return res.json(allComments)
  }

  /**
   * Get hero rating
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {(Array | null)}  heroes
   */
  async getHeroRateScore(req, res) {
    const { idHero } = req.params
    const score = await _userHeroService.getHeroRateScore(idHero)
    return res.json(score)
  }

  // async modifyCHero(req, res) {
  //     const { body } = req;
  //     const  commentHero = await _userHeroService.modifyCHero(body);
  //     // console.log( commentHero)
  //     return res.status(201).send({message: commentHero});
  // }
}

module.exports = UserHeroController
