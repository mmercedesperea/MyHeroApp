const BaseService = require('./base.service')

let _userHeroOBJ = null
/**
 * User hero class service, Our services indicated what actions should be taken according to the data that we receive from the different requests to our api controller
 */
class UserHeroService extends BaseService {
  /**
   *
   * @param {class}  UserHero  insert our UserHero class
   */
  constructor({ UserHero }) {
    super(UserHero)
    _userHeroOBJ = UserHero
  }

  /**
   * Check if the user has a relationship with the hero
   * @param {object} body
   * @returns {object}
   */
  async match(body) {
    return await _userHeroOBJ.match(body)
  }
  /**
   * follow hero
   * @param {object} body body of the element that brings the path
   * @returns {string}  message
   */
  async followHero(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }
    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }

    const matchUserHero = await this.match(body)

    if (!matchUserHero) {
      // insert relationship
      const insertUserHero = await _userHeroOBJ.InsertUH(body)

      if (insertUserHero) {
        return await _userHeroOBJ.followUH(body)
      }
    }

    if (matchUserHero) {
      // update the field to true
      return await _userHeroOBJ.followUH(body)
    }
  }

  /**
   * Unfollow hero
   * @param {object} body body of the element that brings the path
   * @returns {string}  message
   */
  async unfollowHero(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }
    // update to false
    return await _userHeroOBJ.unfollowUH(body)
  }
  /**
   * Favorite hero
   * @param {object} body body of the element that brings the path
   * @returns {string}  message
   */
  async favorite(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }

    // Check if the user has a relationship with the hero
    const matchUserHero = await this.match(body)

    if (!matchUserHero) {
      const insertUserHero = await _userHeroOBJ.InsertUH(body)
      if (insertUserHero) {
        return await _userHeroOBJ.favoriteUH(body)
      }
    }
    if (matchUserHero) {
      // update to true
      return await _userHeroOBJ.favoriteUH(body)
    }
  }

  /**
   * Unfavorite hero
   * @param {object} body body of the element that brings the path
   * @returns {string}  message
   */
  async unfavorite(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }

    // update fild false
    return await _userHeroOBJ.unfavorite(body)
  }

  /**
   * vote hero
   * @param {object} body body of the element that brings the path
   * @returns {string}  message
   */
  async voteHero(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }

    const matchUserHero = await this.match(body)

    if (!matchUserHero) {
      const insertUserHero = await _userHeroOBJ.InsertUH(body)

      if (insertUserHero) {
        return await _userHeroOBJ.voteHero(body)
      }
    }

    if (matchUserHero) {
      return await _userHeroOBJ.voteHero(body)
    }
  }

  /**
   * comment hero
   * @param {object} body body of the element that brings the path
   * @returns {string}  message
   */
  async commentHero(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }

    const matchUserHero = await this.match(body)

    if (!matchUserHero) {
      const insertUserHero = await _userHeroOBJ.InsertUH(body)

      if (insertUserHero) {
        return await _userHeroOBJ.commentHero(body)
      }
    }

    if (matchUserHero) {
      return await _userHeroOBJ.commentHero(body)
    }
  }

  /**
   * delete comment
   * @param {object} body body of the element that brings the path
   * @returns {string}  message
   */
  async deleteCHero(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }
    return await _userHeroOBJ.deleteCHero(body)
  }

  /**
   * get favorites heros
   * @param {number} id
   * @returns {(Array | null)}  Heroes or null
   */
  async getFav(id) {
    if (!id) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }
    const currentEntity = await _userHeroOBJ.getFav(id)

    if (!currentEntity) {
      return null
    }
    return currentEntity
  }

  /**
   * Get heros comment
   * @param {number} idUser
   *  @param {number} idHero
   * @returns {(object | null)}  Hero or null
   */
  async getCommentHero(idUser, idHero) {
    if (!idUser) {
      const error = new Error()
      error.status = 400
      error.message = 'idUser must be sent'
      throw error
    }

    if (!idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'idHero must be sent'
      throw error
    }
    const currentEntity = await _userHeroOBJ.getCommentHero(idUser, idHero)
    if (!currentEntity) {
      return null
    }
    return currentEntity[0]
  }

  /**
   * Get heros vote
 * @param {number} idUser
   *  @param {number} idHero
   * @returns {(object | null)}  Hero or null
   */
  async getVoteHero(idUser, idHero) {
    if (!idUser) {
      const error = new Error()
      error.status = 400
      error.message = 'idUser must be sent'
      throw error
    }

    if (!idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'idHero must be sent'
      throw error
    }
    const currentEntity = await _userHeroOBJ.getVoteHero(idUser, idHero)

    if (!currentEntity) {
      return null
    }
    return currentEntity[0]
  }

  /**
   * Get best marvel heroes
   * @returns {(Array)}  Hero
   */
  async bestMarverHero() {
    const currentEntity = await _userHeroOBJ.bestMarverHero()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no hero from marvel'
      throw error
    }
    return currentEntity
  }

  /**
     * Get best other heroes
     * @returns {(Array)}  Hero
     */
  async bestOTHero() {
    const currentEntity = await _userHeroOBJ.bestOTHero()
    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no hero '
      throw error
    }
    return currentEntity
  }
  /**
   * Get best DC heroes
   * @returns {(Array)}  Hero
   */
  async bestDCHero() {
    const currentEntity = await _userHeroOBJ.bestDCHero()

    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no hero from DC'
      throw error
    }
    return currentEntity
  }

  /**
   * Get most followed heroes
   * @returns {(Array)}  Hero
   */
  async mostFollowHeros() {
    const currentEntity = await _userHeroOBJ.mostFollowHeros()

    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'There is no heros'
      throw error
    }
    return currentEntity
  }

  /**
   * Get hero with user relation
 * @param {number} idUser
   *  @param {number} idHero
   * @returns {(object | null)}  Hero or null
   */
  async getHeroUsu(idUser, idHero) {
    if (!idUser) {
      const error = new Error()
      error.status = 400
      error.message = 'idUser must be sent'
      throw error
    }

    if (!idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'idHero must be sent'
      throw error
    }
    const currentEntity = await _userHeroOBJ.getHeroUsu(idUser, idHero)
    if (!currentEntity) {
      return null
    }
    return currentEntity[0]
  }

  /**
   * Get heros comments
   * @param {number} idHero
   * @returns {(Array | null)}  Hero or null
   */
  async getHeroComments(idHero) {
    if (!idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'idHero must be sent'
      throw error
    }

    const currentEntity = await _userHeroOBJ.getHeroComments(idHero)

    if (!currentEntity) {
      return null
    }
    return currentEntity
  }

  /**
   * Get heros rating score
   * @param {number} idHero
   * @returns {(Array | null)}  Hero or null
   */
  async getHeroRateScore(idHero) {
    if (!idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'idHero must be sent'
      throw error
    }

    const currentEntity = await _userHeroOBJ.getHeroRateScore(idHero)

    if (!currentEntity) {
      return null
    }
    return currentEntity
  }
}

module.exports = UserHeroService
