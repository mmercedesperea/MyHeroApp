/**
 * express module
 * @const
 */
const { Router } = require('express')

/**
 * to ensure that the user is authenticated to access certain routes
 * @const
 */
const { AuthMiddleware, AdminAuth } = require('../middlewares')

/**
 * to manage the routes that affect Team
 * @param {class} TeamController we introduce our class where the Tean controller are
 */
module.exports = function ({ TeamController }) {
  /**
   * way to our routes
   * @const
   */
  const router = Router()

  /**
   * Create team
   * @param {function}  TeamController.createTeam  introduce our class where the Team controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.post('/createTeam', [AuthMiddleware], TeamController.createTeam)

  /**
   * Change team name
   * @param {function}  TeamController.chageName introduce our class where the Team controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.put('/chageName/:idTeam', [AuthMiddleware], TeamController.chageName)

  /**
   * add new member
   * @param {function}  TeamController.addMember introduce our class where the Team controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.put('/addMember/:idTeam', [AuthMiddleware], TeamController.addMember)

  /**
   * Delete member
   * @param {function}  TeamController.deleteMember introduce our class where the Team controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.put(
    '/deleteMember/:idTeam',
    [AuthMiddleware],
    TeamController.deleteMember
  )

  // check the numbers of menbers
  // router.get('/checkTeam/:idTeam', TeamController.checkTeam);

  // get team by id
  // router.get('/getTeam/:idTeam', TeamController.getTeam);

  // get users team
  // router.get('/getTeam/usu/:idUsu', TeamController.getTeamUsu);

  /**
   * Delete team
   * @param {function}  TeamController.delete introduce our class where the Team controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.delete('/:idTeam', [AuthMiddleware], TeamController.delete)

  /**
   * Get team with most stats
   * @param {function}  TeamController.bestTeam introduce our class where the Team controller are and indicate its specific function
   */
  router.get('/bestTeam', TeamController.bestTeam)

  /**
   * Get team info
   * @param {function}  TeamController.getTeamInfo introduce our class where the Team controller are and indicate its specific function
   */
  router.get('/getTeamInfo/:idUsu', TeamController.getTeamInfo)

  /**
   * Get winner team
   * @param {function} TeamController.getTeamWinner introduce our class where the Team controller are and indicate its specific function
   */
  router.get('/getTeamWinner/:idTeam1/:idTeam2', TeamController.getTeamWinner)

  /**
   * Get team by name
   * @param {function} TeamController.searchTeam introduce our class where the Team controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.get('/searchTeam/:TeamName', TeamController.searchTeam)

  return router
}
