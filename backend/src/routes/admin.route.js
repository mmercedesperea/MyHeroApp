/**
 * express module
 * @const
 */
const { Router } = require('express')

/**
 * to ensure that the user is authenticated to access certain routes
 * @const
 */
const {
  AuthMiddleware,
  AdminAuth,
  ParseIntMiddleware,
  CacheMiddleware
} = require('../middlewares')

/**
 * to manage the routes that affect Admin
 * @param {class} AdminController we introduce our class where the Admin controller are
 */
module.exports = function ({ AdminController }) {
  /**
   * way to our routes
   * @const
   */
  const router = Router()

  /**
   * Create a new hero
   * @param {class} AdminController.newHero we introduce our class where the Admin controller are
   * @param {function} AuthMiddleware
   * @param {function} AdminAuth.isAdmin
   */
  router.post(
    '/newHero',
    [AuthMiddleware, AdminAuth.isAdmin],
    AdminController.newHero
  )

  /**
   * Modify hero
   * @param {class} AdminController.modifyHero we introduce our class where the Admin controller are
   * @param {function} AuthMiddleware
   * @param {function} AdminAuth.isAdmin
   */
  router.put(
    '/modifyHero/:idHero',
    [AuthMiddleware, AdminAuth.isAdmin],
    AdminController.modifyHero
  )

  /**
   * Delete user
   * @param {class} AdminController.deleteUser we introduce our class where the Admin controller are
   * @param {function} AuthMiddleware
   * @param {function} AdminAuth.isAdmin
   */
  router.delete(
    '/:idUsu',
    [AuthMiddleware, AdminAuth.isAdmin],
    AdminController.deleteUser
  )

  /**
   * Get all Users
   * @param {class} AdminController.allUsers we introduce our class where the Admin controller are
   * @param {function} AuthMiddleware
   * @param {function} AdminAuth.isAdmin
   */
  router.get(
    '/allUsers',
    [AuthMiddleware, AdminAuth.isAdmin],
    AdminController.allUsers
  )

  /**
   * Get count users
   * @param {class} AdminController.countAllUsers we introduce our class where the Admin controller are
   * @param {function} AuthMiddleware
   * @param {function} AdminAuth.isAdmin
   */
  router.get(
    '/countAllUsers',
    [AuthMiddleware, AdminAuth.isAdmin],
    AdminController.countAllUsers
  )

  /**
  * Get count teams
  * @param {class} AdminController.countAllTeams introduce our class where the Admin controller are
  * @param {function} AuthMiddleware
  * @param {function} AdminAuth.isAdmin
  */
  router.get(
    '/countAllTeams',
    [AuthMiddleware, AdminAuth.isAdmin],
    AdminController.countAllTeams
  )

  /**
  * Get count heroes
  * @param {class} AdminController.countAllHeroes we introduce our class where the Admin controller are
  * @param {function} AuthMiddleware
  * @param {function} AdminAuth.isAdmin
  */
  router.get(
    '/countAllHeroes',
    [AuthMiddleware, AdminAuth.isAdmin],
    AdminController.countAllHeroes
  )

  return router
}
