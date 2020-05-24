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
 * to manage the routes that affect user
 * @param {class} UserHeroController we introduce our class where the User controller are
 */
module.exports = function ({ UserController }) {
  /**
   * way to our routes
   * @const
   */
  const router = Router()

  /**
   *  Get a user
   * @param {function}  UserController.get  introduce our class where the User controller are and indicate its specific function
   */
  router.get('/:idUsu', UserController.get)

  /**
   *  update a user
   * @param {function}  UserController.update  introduce our class where the User controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.put('/:idUsu', [AuthMiddleware], UserController.update)

  /**
   *  user new pass
   * @param {function}  UserController.updatePass  introduce our class where the User controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.put('/newpass/:idUsu', [AuthMiddleware], UserController.updatePass)

  /**
   *  delete user
   * @param {function}  UserController.delete  introduce our class where the User controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.post('/deleteUser/:idUsu', [AuthMiddleware], UserController.delete)

  /**
   *  Follow user
   * @param {function}  UserController.followUser  introduce our class where the User controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.post('/followUser', [AuthMiddleware], UserController.followUser)

  /**
   *  unfollow a user
   * @param {function}  UserController.unFollowUser  introduce our class where the User controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.delete(
    '/unFollowUser/:idUsu/:idUnfollow',
    [AuthMiddleware],
    UserController.unFollowUser
  )

  /**
   *  search a user by name
   * @param {function}  UserController.getUserByName  introduce our class where the User controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.get('/getUserByName/:userName', UserController.getUserByName)

  // router.post('/uploadImg/:idUsu',[md_upload],UserController.uploadImage);

  /**
   *  Check whether a user is being followed
   * @param {function}  UserController.checkFollow  introduce our class where the User controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.get('/checkFollow/:idUsu/:idUnfollow', UserController.checkFollow)

  /**
   *  get all the users you follow
   * @param {function}  UserController.getFollowUsers  introduce our class where the User controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.get('/getFollowUsers/:idUsu', UserController.getFollowUsers)

  /**
   *  get all the users who follow you
   * @param {function}  UserController.getFollowersUsers  introduce our class where the User controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.get('/getFollowersUsers/:idUsu', UserController.getFollowersUsers)

  /**
   *  Update photo
   * @param {function}  UserController.newImg  introduce our class where the User controller are and indicate its specific function
   * @param {function} AuthMiddleware
   */
  router.put('/newImg/user', [AuthMiddleware], UserController.newImg)

  return router
}
