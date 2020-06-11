let table = null
let _DB = null

/**
 * team class
 */
class Team {
  /**
   *
   * @param {class} DB insert our db conexion class
   */
  constructor({ DB }) {
    this.idTeam = 0
    this.idUsu = 0
    this.teamName = ''
    this.member_1 = ''
    this.member_2 = ''
    this.member_3 = ''
    this.member_4 = ''
    this.member_5 = ''
    table = 'team'
    _DB = DB
  }
  /**
   * create a team
   * @param {object} entity body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async create(entity) {
    return await _DB.create(
      `INSERT INTO ${table} (idUsu,teamName) VALUES (${entity.idUsu},'${entity.teamName}')`
    )
  }

  // async checkTeam(idTeam) {
  //     return await _DB.consulta(`SELECT * FROM ${table} WHERE idTeam = ${idTeam} AND member_1 + member_2 + member_3 +member_4 + member_5 is not null`);
  // }

  /**
   * Get a team by id
   * @param {number} idTeam
   * @return {object} if the function is successful it will return one element from the DB, if not will be returned indicating that there has been a failure
   */
  async get(idTeam) {
    return await _DB.consulta(
      `SELECT a.idTeam,a.idUsu,a.teamName,a.member_1,a.member_2,a.member_3,a.member_4,a.member_5,  SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b WHERE a.idTeam =${idTeam} AND  b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5)`
    )
  }

  // async getTeamUsu(idUsu) {
  //     return await _DB.consulta(`SELECT h.*,T.*,(SELECT SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b WHERE a.idTeam =t.idTeam AND  b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5)) as totalPoint FROM heroes h JOIN team t ON ( h.idHero = t.member_1 or h.idHero = t.member_2 or h.idHero = t.member_3 or h.idHero = t.member_4 or h.idHero = t.member_5) WHERE t.idUsu= ${idUsu}`);
  // }

  /**
   * update team name
   * @param {number} idTeam
   * @param {object} entity  body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async update(idTeam, entity) {
    return await _DB.update(
      `UPDATE ${table}  SET teamName = '${entity.teamName}' WHERE idTeam = ${idTeam}`
    )
  }

  /**
   * add a member
   * @param {number} idTeam
   * @param {object} entity  body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async addMember(idTeam, entity) {
    return await _DB.update(
      `UPDATE ${table}  SET ${entity.member} = ${entity.codHero} WHERE idTeam = ${idTeam}`
    )
  }

  /**
   * delete team member
   * @param {number} idTeam
   * @param {object} entity  body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async deleteMember(idTeam, entity) {
    return await _DB.update(
      `UPDATE ${table} SET ${entity.member} = NULL WHERE idTeam = ${idTeam}`
    )
  }

  /**
   * delete team
   * @param {number} idTeam
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async delete(idTeam) {
    return await _DB.delete(`DELETE FROM ${table} WHERE idTeam = ${idTeam}`)
  }
  /**
   * Get the team with highest stats
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async bestTeam() {
    return await _DB.consulta(
      `SELECT c.alias,a.idTeam,a.idUsu,a.teamName,a.member_1,a.member_2,a.member_3,a.member_4,a.member_5, SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b, users c WHERE a.idUsu = c.idUsu AND b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5) GROUP BY a.teamName ORDER by totalPoint DESC LIMIT 1`
    )
  }

  /**
   * Get the team info
   * @param {number} idUsu
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getTeamInfo(idUsu) {
    return await _DB.consulta(`SELECT * FROM team  WHERE idUsu =${idUsu}`)
  }

  /**
   * Get the winner team
   * @param {number} idTeam1
   * @param {number} idTeam2
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getTeamWinner(idTeam1, idTeam2) {

    var Team1 = await _DB.consulta(
      `SELECT c.alias,a.idTeam,a.idUsu,a.teamName,a.member_1,a.member_2,a.member_3,a.member_4,a.member_5, SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b, users c WHERE a.idUsu = c.idUsu AND b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5) and idTeam= ${idTeam1} GROUP BY a.teamName ORDER by totalPoint`
    )
    var Team2 = await _DB.consulta(
      `SELECT c.alias,a.idTeam,a.idUsu,a.teamName,a.member_1,a.member_2,a.member_3,a.member_4,a.member_5, SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b, users c WHERE a.idUsu = c.idUsu AND b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5) and idTeam= ${idTeam2} GROUP BY a.teamName ORDER by totalPoint`
    )
    if (Team1[0].totalPoint > Team2[0].totalPoint) {
      return Team1[0]
    } else {
      return Team2[0]
    }
  }

  /**
   * search team by name
   * @param {string} teamName
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async searchTeam(teamName) {
    return await _DB.consulta(`SELECT c.alias,a.idTeam,a.idUsu,a.teamName,a.member_1,a.member_2,a.member_3,a.member_4,a.member_5, SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b, users c WHERE a.idUsu = c.idUsu AND b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5) and teamName LIKE '${teamName}%' GROUP BY a.teamName ORDER by totalPoint
        `)
  }
}

module.exports = Team
