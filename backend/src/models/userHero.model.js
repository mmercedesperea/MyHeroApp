let table = null
let _DB = null

/**
 * User and Hero relationship class
 */
class UserHero {
  /**
   *
   * @param {class} DB insert our db connection class
   */
  constructor({ DB }) {
    this.idUsu = 0
    this.idHero = 0
    this.score = 0
    this.comment = ''
    this.favorite = 0
    this.follow = 0
    table = 'usu_hero'
    _DB = DB
  }

  /**
   * Get the link of a user with a hero
   * @param {object} body body of the element that brings the path
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async match(body) {
    return await _DB.consulta(
      `SELECT * from ${table} WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`
    )
  }

  /**
   * Insert a user with a hero in the db
   * @param {object} body body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async InsertUH(body) {
    return await _DB.create(
      `INSERT INTO ${table} ( idUsu, idHero) VALUES (${body.idUsu}, ${body.idHero})`
    )
  }
  /**
   * upgrade to follow
   * @param {object} body body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async followUH(body) {
    return await _DB.update(
      `UPDATE ${table}  SET follow = 1 WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`
    )
  }

  /**
   * upgrade to Unfollow
   * @param {object} body body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async unfollowUH(body) {
    return await _DB.update(
      `UPDATE ${table}  SET follow = 0, favorite = 0 WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`
    )
  }

  /**
   * upgrade to favorite
   * @param {object} body body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async favoriteUH(body) {
    return await _DB.update(
      `UPDATE ${table}  SET favorite = 1 WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`
    )
  }
  /**
   * upgrade to Unfavorite
   * @param {object} body body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async unfavorite(body) {
    return await _DB.update(
      `UPDATE ${table}  SET favorite = 0 WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`
    )
  }

  /**
   * vote a hero
   * @param {object} body body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async voteHero(body) {
    return await _DB.update(
      `UPDATE ${table}  SET score =  ${body.score} WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`
    )
  }

  /**
   * comment a hero
   * @param {object} body body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async commentHero(body) {
    return await _DB.update(
      `UPDATE ${table}  SET comment =  '${body.comment}' WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`
    )
  }

  /**
   * delete comment from a hero
   * @param {object} body body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async deleteCHero(body) {
    return await _DB.update(
      `UPDATE ${table}  SET comment =  NULL WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`
    )
  }

  /**
   * get all the heroes related to the user
   * @param {number} id id of the user
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async get(id) {
    return await _DB.consulta(
      `SELECT h.*,U.score FROM heroes h,usu_hero U where h.idHero = U.idHero and U.follow= 1 AND U.favorite=0 and U.idUsu=${id}`
    )
  }

  /**
   * get all favorite heroes from a user
   * @param {number} id id of the user
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getFav(id) {
    return await _DB.consulta(
      `SELECT h.*,U.score FROM heroes h,usu_hero U where h.idHero = U.idHero and U.favorite= 1 and U.idUsu=${id}`
    )
  }

  /**
   * Get the comment of a user hero
   * @param {number} idUser id of the user
   * @param {number} idHero id of the Hero
   * @return {array} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getCommentHero(idUser, idHero) {
    return await _DB.consulta(
      `SELECT comment from ${table} WHERE idUsu =${idUser} AND idHero =${idHero}`
    )
  }

  /**
   * Get the vote of a user hero
   * @param {number} idUser id of the user
   * @param {number} idHero id of the Hero
   * @return {array} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getVoteHero(idUser, idHero) {
    return await _DB.consulta(
      `SELECT score from ${table} WHERE idUsu =${idUser} AND idHero =${idHero}`
    )
  }
  /**
     * Get the best marvel heroes from db
     * @return {array} if the function is successful it will return and array elements from the DB, if not will be returned indicating that there has been a failure
     * 
     */
  async bestMarverHero() {
    return await _DB.consulta(
      `select a.idHero, a.heroName, a.image,a.publisher, ROUND(sum(b.score) / count(a.idHero),1) as score FROM heroes a, usu_hero b  WHERE a.publisher = 'Marvel Comics' AND a.idHero = b.idHero AND score > 0 GROUP by idHero ORDER by score DESC`
    )
  }

  /**
    * Get the best other heroes from db
    * @return {array} if the function is successful it will return and array elements from the DB, if not will be returned indicating that there has been a failure
    * 
    */
  async bestOTHero() {
    return await _DB.consulta(
      `select a.idHero, a.heroName, a.image,a.publisher, ROUND(sum(b.score) / count(a.idHero),1) as score FROM heroes a, usu_hero b  WHERE a.publisher != 'Marvel Comics' AND a.publisher != 'DC Comics' AND a.idHero = b.idHero AND score > 0 GROUP by idHero ORDER by score DESC`
    )
  }
  /**
    * Get the best DC heroes from db
    * @return {array} if the function is successful it will return and array elements from the DB, if not will be returned indicating that there has been a failure
    * 
    */
  async bestDCHero() {
    return await _DB.consulta(
      `select a.idHero, a.heroName, a.image,a.publisher, ROUND(sum(b.score) / count(a.idHero),1) as score FROM heroes a, usu_hero b  WHERE a.publisher = 'DC Comics' AND a.idHero = b.idHero AND score > 0 GROUP by idHero ORDER by score DESC`
    )
  }

  /**
 * Get the most followed heroes
 * @return {array} if the function is successful it will return and array elements from the DB, if not will be returned indicating that there has been a failure
 * 
 */
  async mostFollowHeros() {
    return await _DB.consulta(
      `select a.idHero, a.heroName, a.image, count(a.idHero) as followers FROM heroes a, usu_hero b WHERE a.idHero = b.idHero AND b.follow = 1 GROUP by idHero ORDER by followers DESC LIMIT 12`
    )
  }

  /**
   * Get a hero and a user relationship
   * @param {number} idUser id of the user
   * @param {number} idHero id of the Hero
   * @return {array} if the function is successful it will return one element from the DB, if not will be returned indicating that there has been a failure
   */
  async getHeroUsu(idUser, idHero) {
    return await _DB.consulta(
      `SELECT * from ${table} WHERE idUsu =${idUser} AND idHero =${idHero}`
    )
  }

  /**
   * Get all hero comments
   * @return {array} if the function is successful it will return and array elements from the DB, if not will be returned indicating that there has been a failure
   * 
   */
  async getHeroComments(idHero) {
    return await _DB.consulta(
      `SELECT UH.comment, UH.score,U.alias,U.idUsu,U.photo from usu_hero UH JOIN users U ON(U.idUsu = UH.idUsu) where idHero = ${idHero} AND ((UH.comment is NOT NULL ) or (UH.score >0)) `
    )
  }

  /**
   * Get the hero rating score
   * @return {number} if the function is successful it will return the hero rate from the DB, if not will be returned indicating that there has been a failure
   *
   */
  async getHeroRateScore(idHero) {
    return await _DB.consulta(
      `SELECT ROUND((SUM(score))/(count(idUsu)),1) as 'rate' from usu_hero where idHero = ${idHero} AND score > 0 `
    )
  }

  // async modifyCHero(body) {
  //     return await _DB.update(`UPDATE ${table}  SET comment =  '${body.comment}' WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
  // }
}

module.exports = UserHero
