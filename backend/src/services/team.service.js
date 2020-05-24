const BaseService = require('./base.service')
let _teamObj = null

/**
 * Team class service, Our services indicated what actions should be taken according to the data that we receive from the different requests to our api controller
 */
class TeamService extends BaseService {
  /**
   *
   * @param {class} Team insert our Team class
   */
  constructor ({ Team }) {
    super(Team)
    _teamObj = Team
  }

  /**
   * check the number os members
   * @param {number} idTeam
   * @returns {boolean}
   */
  async checkTeam (idTeam) {
    if (!idTeam) {
      const error = new Error()
      error.status = 400
      error.message = 'idTeam must be sent'
      throw error
    }
    const numMembers = await _teamObj.checkTeam(idTeam)
    if (numMembers) {
      return true
    }
    return false
  }

  /**
   * Add member
   * @param {number} idTeam
   * @param {object} entity body of the element that brings the path
   * @returns {string}  message
   */
  async addMember (idTeam, entity) {
    if (!idTeam) {
      const error = new Error()
      error.status = 400
      error.message = 'idTeam must be sent'
      throw error
    }
    if (!entity) {
      const error = new Error()
      error.status = 400
      error.message = 'entity must be sent'
      throw error
    }
    return await _teamObj.addMember(idTeam, entity)
  }

  /**
   * Delete member
   * @param {number} idTeam
   * @param {object} entity body of the element that brings the path
   * @returns {string}  message
   */
  async deleteMember (idTeam, entity) {
    if (!idTeam) {
      const error = new Error()
      error.status = 400
      error.message = 'idTeam must be sent'
      throw error
    }
    if (!entity) {
      const error = new Error()
      error.status = 400
      error.message = 'entity must be sent'
      throw error
    }
    return await _teamObj.deleteMember(idTeam, entity)
  }

  /**
   * Best team
   * @returns {array}  teams
   */
  async bestTeam () {
    const currentEntity = await _teamObj.bestTeam()

    if (!currentEntity) {
      const error = new Error()
      error.status = 400
      error.message = 'Entity must be sent'
      throw error
    }
    return currentEntity
  }

  /**
   * Get team user
   *  @param {number} idUsu
   * @returns {(Array | null)}  team or null
   */
  async getTeamUsu (id) {
    if (!id) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }
    const currentEntity = await _teamObj.getTeamUsu(id)

    if (!currentEntity) {
      return null
    }
    return currentEntity
  }

  /**
   * Get team info user
   *  @param {number} idUsu
   * @returns {(object | null)}  team or null
   */
  async getTeamInfo (idUsu) {
    if (!idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'idusu must be sent'
      throw error
    }
    const currentEntity = await _teamObj.getTeamInfo(idUsu)

    if (!currentEntity) {
      return null
    }
    return currentEntity[0]
  }

  /**
   * Get team winner
   *  @param {number} idTeam1
   *  @param {number} idTeam2
   * @returns {object }  team
   */
  async getTeamWinner (idTeam1, idTeam2) {
    if (!idTeam1) {
      const error = new Error()
      error.status = 400
      error.message = 'idTeam must be sent'
      throw error
    }

    if (!idTeam2) {
      const error = new Error()
      error.status = 400
      error.message = 'idteam must be sent'
      throw error
    }
    return await _teamObj.getTeamWinner(idTeam1, idTeam2)
  }

  /**
   * Get team  by name
   *  @param {string} teamName
   * @returns {(array | null)}  team or null
   */
  async searchTeam (teamName) {
    if (!teamName) {
      const error = new Error()
      error.status = 400
      error.message = 'teamName must be sent'
      throw error
    }
    const currentEntity = await _teamObj.searchTeam(teamName)

    if (!currentEntity) {
      return null
    }
    return currentEntity
  }
}

module.exports = TeamService
