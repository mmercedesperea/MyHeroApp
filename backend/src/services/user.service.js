const BaseService = require('./base.service')

let _userOBJ = null

/**
 * User class service, Our services indicated what actions should be taken according to the data that we receive from the different requests to our api controller
 */
class UserService extends BaseService {
  /**
   *
   * @param {class} User insert our user class
   */
  constructor ({ User }) {
    super(User)
    _userOBJ = User
  }

  /**
   * Get user by mail
   * @param {string} email
   * @returns {object}
   */
  async getUserByemail (email) {
    if (!email) {
      const error = new Error()
      error.status = 400
      error.message = 'Email must be sent'
      throw error
    }
    return await _userOBJ.getUserByemail(email)
  }

  /**
   * update pass
   * @param {number} id userId
   * @param {object} entity body of the element that brings the path
   * @returns {string}  message
   */
  async updatePass (id, entity) {
    if (!id) {
      screen
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }
    // comprobamos que el usuario existe
    const userExist = await this.getUserByemail(entity.email)

    if (!userExist) {
      const error = new Error()
      error.status = 402
      error.message = 'User does not exists'
      throw error
    }
    // guardamos la contraseña del usuario perteneciente a ese emal
    const UserPas = userExist[0].password

    //comporbamos las contraseñas
    const validPassword = await _userOBJ.comparePasswords(
      UserPas,
      entity.password
    )

    if (!validPassword) {
      const error = new Error()
      error.status = 400
      error.message = 'Invalid Password'
      throw error
    }

    // ciframos la nueva contraseña
    entity.newPassword = await _userOBJ.hasPass(entity.newPassword)

    return await _userOBJ.updatePass(id, entity)
  }

  /**
   * delete user
   * @param {id} id userId
   * @param {object} entity body of the element that brings the path
   * @returns {string}  message
   */
  async deleteUser (id, entity) {
    if (!id) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }
    const userExist = await this.getUserByemail(entity.email)

    if (!userExist) {
      const error = new Error()
      error.status = 402
      error.message = 'User does not exists'
      throw error
    }
    // guardamos la contraseña del usuario perteneciente a ese emal
    const UserPas = userExist[0].password

    //comporbamos las contraseñas
    const validPassword = await _userOBJ.comparePasswords(
      UserPas,
      entity.password
    )

    if (!validPassword) {
      const error = new Error()
      error.status = 400
      error.message = 'Invalid Password'
      throw error
    }

    return await _userOBJ.deleteUser(id)
  }

  /**
   * follow user
   * @param {object} body body of the element that brings the path
   * @returns {string}  message
   */
  async followUser (body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idUsuFollow) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    return await _userOBJ.followUser(body)
  }

  /**
   * Unfollow user
   * @param {number} idUsu
    * @param {number} idUnfollow
   * @returns {string}  message
   */
  async unFollowUser (idUsu, idUnfollow) {
    if (!idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!idUnfollow) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    return await _userOBJ.unFollowUser(idUsu, idUnfollow)
  }

  /**
   * Get user by name
   *  @param {string} userName
   * @returns {(Array | null)}  user or null
   */
  async getUserByName (userName) {
    if (!userName) {
      const error = new Error()
      error.status = 400
      error.message = 'userName must be sent'
      throw error
    }
    const currentEntity = await _userOBJ.getUserByName(userName)

    if (!currentEntity) {
      return null
    }
    return currentEntity
  }

  /**
   * check follow user
   *  @param {number} idUsu
   *  @param {number} idUnfollow
   * @returns {(object | null)}  user or null
   */
  async checkFollow (idUsu, idUnfollow) {
    if (!idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'idUsu must be sent'
      throw error
    }

    if (!idUnfollow) {
      const error = new Error()
      error.status = 400
      error.message = 'idUnfollow must be sent'
      throw error
    }
    const currentEntity = await _userOBJ.checkFollow(idUsu, idUnfollow)

    if (!currentEntity) {
      return null
    }
    return currentEntity[0]
  }

  /**
   * get follow user
   *  @param {number} idUsu
   * @returns {(Array | null)}  user or null
   */
  async getFollowUsers (idUsu) {
    if (!idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'idUsu must be sent'
      throw error
    }

    const currentEntity = await _userOBJ.getFollowUsers(idUsu)

    if (!currentEntity) {
      return null
    }
    return currentEntity
  }

  /**
   * Get follower user
   *  @param {number} idUsu
   * @returns {(Array | null)}  user or null
   */
  async getFollowersUsers (idUsu) {
    if (!idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'idUsu must be sent'
      throw error
    }
    const currentEntity = await _userOBJ.getFollowersUsers(idUsu)
    if (!currentEntity) {
      return null
    }
    return currentEntity
  }

  /**
   * update img
   * @param {object} body body of the element that brings the path
   * @returns {string}  message
   */
  async newImg (body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.img) {
      const error = new Error()
      error.status = 400
      error.message = 'img must be sent'
      throw error
    }

    return await _userOBJ.newImg(body)
  }
}

module.exports = UserService
