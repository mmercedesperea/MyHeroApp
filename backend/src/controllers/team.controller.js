let _teamService = null

/**
 * Team class with controllers functions
 */
class TeamController {
  /**
   *
   * @param {class} TeamService insert our team service in our class
   */
  constructor({ TeamService }) {
    _teamService = TeamService
  }

  /**
   * create a team
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async createTeam(req, res) {
    const { body } = req
    const createTeam = await _teamService.create(body)
    return res.status(201).send({ message: createTeam })
  }

  /**
   * check the number of members
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {boolean}
   */
  async checkTeam(req, res) {
    const { idTeam } = req.params
    const team = await _teamService.checkTeam(idTeam)
    return res.json(team)
  }

  /**
   * Get team by id
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  team
   */
  async getTeam(req, res) {
    const { idTeam } = req.params
    const team = await _teamService.get(idTeam)
    //    JSON.stringify(team)
    return res.json(team)
  }

  /**
   * Get team user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  team
   */
  async getTeamUsu(req, res) {
    const { idUsu } = req.params
    const team = await _teamService.getTeamUsu(idUsu)
    //    JSON.stringify(team)
    return res.json(team)
  }

  /**
   * Change team name
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async chageName(req, res) {
    const { idTeam } = req.params
    const { body } = req
    const chageName = await _teamService.update(idTeam, body)
    return res.status(201).send({ message: chageName })
  }

  /**
   * Add member
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async addMember(req, res) {
    const { idTeam } = req.params
    const { body } = req
    const addMember = await _teamService.addMember(idTeam, body)
    return res.status(201).send({ message: addMember })
  }

  /**
   * Delete member
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async deleteMember(req, res) {
    const { idTeam } = req.params
    const { body } = req
    const deleteMember = await _teamService.deleteMember(idTeam, body)
    return res.status(201).send({ message: deleteMember })
  }

  /**
   * Delete team
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {string}  message
   */
  async delete(req, res) {
    const { idTeam } = req.params
    const deleteTeam = await _teamService.delete(idTeam)
    // console.log(deleteTeam)
    return res.status(201).send({ message: deleteTeam })
  }

  /**
   * Get best team
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  teams
   */
  async bestTeam(req, res) {
    const team = await _teamService.bestTeam()
    return res.json(team)
  }

  /**
   * Get team info
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  team
   */
  async getTeamInfo(req, res) {
    const { idUsu } = req.params
    // console.log(idUsu)
    const team = await _teamService.getTeamInfo(idUsu)
    //    JSON.stringify(team)
    return res.json(team)
  }

  /**
   * Get winner team
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {object}  team
   */
  async getTeamWinner(req, res) {
    const { idTeam1 } = req.params
    const { idTeam2 } = req.params
    const heroWin = await _teamService.getTeamWinner(idTeam1, idTeam2)
    return res.json(heroWin)
  }

  /**
   * Search team by name
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Array}  teams
   */
  async searchTeam(req, res) {
    const { TeamName } = req.params
    const team = await _teamService.searchTeam(TeamName)
    return res.json(team)
  }
}

module.exports = TeamController
