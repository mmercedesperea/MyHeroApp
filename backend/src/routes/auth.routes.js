/**
 * express module
 * @const
 */
const { Router } = require('express')

/**
 * to manage the routes that affect auth
 * @param {class} AuthController we introduce our class where the Auth controller are
 */
module.exports = function ({ AuthController }) {
  /**
   * way to our routes
   * @const
   */
  const router = Router()

  /**
   * Sign up user
   * @param {class} AuthController.signUp we introduce our class where the Auth controller are
   */
  router.post('/signup', AuthController.signUp)
  /**
   * Sign in user
   * @param {class} AuthController.signIn we introduce our class where the Auth controller are
   */
  router.post('/signin', AuthController.signIn)

  return router
}
