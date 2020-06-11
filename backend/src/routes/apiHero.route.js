/**
 * express module
 * @const
 */
const { Router } = require('express')

/**
 * to manage the routes that affects Api
 * @param {class} ApiHeroController we introduce our class where the auth controller are
 */
module.exports = function ({ ApiHeroController }) {
  /**
   * way to our routes
   * @const
   */
  const router = Router()

  /**
   * Get a hero by name
   * @param {class} ApiHeroController.get we introduce our class where the Auth controller are
   */
  router.get('/search/:name', ApiHeroController.get)

  /**
   * Get a hero by id
   * @param {class} ApiHeroController.getHeroByid we introduce our class where the Auth controller are
   */
  router.get('/searchByid/:id', ApiHeroController.getHeroByid)

  /**
   * Get all api heroes
   * @param {class} ApiHeroController.searchAllHeroes we introduce our class where the Auth controller are
   */
  router.get('/searchAllHeroes', ApiHeroController.searchAllHeroes)

  return router
}
