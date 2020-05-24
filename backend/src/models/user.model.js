const { compareSync, hashSync, genSaltSync } = require('bcryptjs')
let table = null
let _DB = null

/**
 * User class
 */
class User {
  /**
   *
   * @param {class} DB insert our db conexion class
   */
  constructor ({ DB }) {
    this.idUsu = 0
    this.email = ''
    this.password = ''
    this.userName = ''
    this.alias = ''
    this.surname = ''
    this.dateOfBirth = ''
    this.photo = ''
    this.admin = ''
    _DB = DB
    table = 'users'
  }

  /**
   * Compare encrypted passwords
   * @param {string} UserPas User pass
   * @param {string} password user pass from db
   * @return {boolean} The result of compareSync function
   */
  async comparePasswords (UserPas, password) {
    return await compareSync(password, UserPas)
  }

  /**
   * for before saving the user that the password is encrypted
   * @param {object} user
   * @return {object} user with encrypted pass
   */
  async pre (user) {
    // salt is generated
    const salt = genSaltSync(10)
    // and we generate the password hash
    const hashedPassword = hashSync(user.password, salt)
    // and add it to our user
    user.password = hashedPassword
    return await user
  }

  /**
   * To hash pass
   * @param {string} password
   * @return hash password
   */
  async hasPass (password) {
    const salt = genSaltSync(10)
    // y generamos el hash de la contraseña
    const hashedPassword = hashSync(password, salt)

    return await hashedPassword
  }

  /**
   * Get a user by id
   * @param {number} id
   * @return {object} if the function is successful it will return one element from the DB, if not will be returned indicating that there has been a failure
   */
  async get (id) {
    return await _DB.consulta(`SELECT * from ${table} WHERE idUsu =${id}`)
  }

  /**
   * Get a user by email
   * @param {string} email
   * @return {object} if the function is successful it will return one element from the DB, if not will be returned indicating that there has been a failure
   */
  async getUserByemail (email) {
    return await _DB.consulta(`SELECT * FROM ${table} WHERE email = '${email}'`)
  }

  /**
   * Insert a user in the db
   * @param {object} entity body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async create (entity) {
    return await _DB.create(
      `INSERT INTO ${table} ( email, password,alias) VALUES ('${entity.email}', '${entity.password}','${entity.alias}')`
    )
  }

  /**
   * upgrade to user
   * @param {object} entity body of the element that brings the path
   * @param {number} idUsu User id
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async update (idUsu, entity) {
    return await _DB.update(
      `UPDATE ${table}  SET email = '${entity.email}', userName = '${entity.userName}', alias = '${entity.alias}',surname ='${entity.surname}' ,dateOfBirth ='${entity.dateOfBirth}' WHERE idUsu = ${idUsu}`
    )
  }

  /**
   * upgrade to user pass
   * @param {object} entity body of the element that brings the path
   * @param {number} idUsu User id
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async updatePass (idUsu, entity) {
    return await _DB.update(
      `UPDATE ${table} SET password = '${entity.newPassword}' WHERE idUsu = ${idUsu}`
    )
  }

  /**
   * Delete user
   * @param {number} idUsu User id
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async deleteUser (idUsu) {
    return await _DB.delete(`DELETE FROM ${table} WHERE idUsu = ${idUsu}`)
  }

  /**
   * follow a user
   * @param {object} entity body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async followUser (entity) {
    return await _DB.create(
      `INSERT INTO follows ( followingIdUsu, followedIdUsu) VALUES (${entity.idUsu},${entity.idUsuFollow})`
    )
  }

  /**
   * Unfollow a user
   * @param {object} entity body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async unFollowUser (idUsu, idUnfollow) {
    return await _DB.delete(
      `DELETE FROM follows WHERE followingIdUsu = ${idUsu} AND followedIdUsu = ${idUnfollow}`
    )
  }

  /**
   * Get user by name
   * @param {string}  userName user name
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getUserByName (userName) {
    console.log('llego aqui' + userName)
    return await _DB.consulta(
      `SELECT idUsu,alias,userName,surname,dateOfBirth,photo from ${table} WHERE alias LIKE '${userName}%'`
    )
  }

  /**
   * Check is a user is follow another
   * @param {number}  idUsu id user
   * @param {number}  idUnfollow id user2
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async checkFollow (idUsu, idUnfollow) {
    return await _DB.consulta(
      `SELECT * from follows WHERE followingIdUsu = ${idUsu} AND  followedIdUsu = ${idUnfollow}`
    )
  }

  /**
   * Get user following you
   * @param {number} idUsu
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getFollowersUsers (idUsu) {
    return await _DB.consulta(
      `SELECT U.alias,U.idUsu,U.photo from follows F JOIN users U ON(U.idUsu = F.followingIdUsu) where followedIdUsu = ${idUsu}`
    )
  }

  /**
   * Get the people I follow
   * @param {number} idUsu
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getFollowUsers (idUsu) {
    return await _DB.consulta(
      `SELECT U.alias,U.idUsu,U.photo from follows F JOIN users U ON(U.idUsu = F.followedIdUsu) where followingIdUsu = ${idUsu} `
    )
  }

  /**
   * upgrade to user img
   * @param {object} entity body of the element that brings the path
   * @param {number} idUsu User id
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async newImg (entity) {
    return await _DB.update(
      `UPDATE ${table}  SET photo = '${entity.img}' WHERE idUsu = ${entity.idUsu}`
    )
  }

  /**
   * all users form db
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async allUsers () {
    return await _DB.consulta(
      `SELECT photo,alias,idUsu,createDate,admin,email from ${table}`
    )
  }
}

module.exports = User
