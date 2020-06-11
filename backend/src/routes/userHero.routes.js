/**
 * express module
 * @const
 */
const { Router } = require('express')

/**
 * to manage the routes that affect UserHero
 * @param {class} UserHeroController we introduce our class where the UserHero controller are
 */
module.exports = function ({ UserHeroController }) {
  /**
   * way to our routes
   * @const
   */
  const router = Router()

  /**
   *  Follow a hero with put
   * @param {function}  UserHeroController.followHero  introduce our class where the UserHero controller are and indicate its specific function
   */
  router.put('/followHero', UserHeroController.followHero)

  /**
   *  Unfollow a hero with put
   * @param {function}  UserHeroController.unfollowHero  introduce our class where the UserHero controller are and indicate its specific function
   */
  router.put('/unfollowHero', UserHeroController.unfollowHero)

  /**
   * favorite a hero with put
   * @param {function}  UserHeroController.favorite introduce our class where the UserHero controller are and indicate its specific function
   */
  router.put('/favorite', UserHeroController.favorite)

  /**
   *  Unfavorite a hero with put
   * @param {function}  UserHeroController.unfavorite introduce our class where the UserHero controller are and indicate its specific function
   */
  router.put('/unfavorite', UserHeroController.unfavorite)

  /**
   *  vote a hero with put
   * @param {function}  UserHeroController.voteHero introduce our class where the UserHero controller are and indicate its specific function
   */
  router.put('/voteHero', UserHeroController.voteHero)

  /**
   *  Comment a hero with put
   * @param {function}  UserHeroController.commentHero introduce our class where the UserHero controller are and indicate its specific function
   */

  router.put('/commentHero', UserHeroController.commentHero)

  /**
   *  Delete a comment a hero with put
   * @param {function}  UserHeroController.deleteCHero introduce our class where the UserHero controller are and indicate its specific function
   */

  router.put('/deleteCHero', UserHeroController.deleteCHero)

  /**
   * Get all the favorite heroes
   * @param {function}  UserHeroController.allHerosFav introduce our class where the UserHero controller are and indicate its specific function
   */

  router.get('/allHerosFav/:idUsu', UserHeroController.allHerosFav)

  /**
   * Get all the follow heroes
   * @param {function}  UserHeroController.allHerosFoll introduce our class where the UserHero controller are and indicate its specific function
   */

  router.get('/allHerosFoll/:idUsu', UserHeroController.allHerosFoll)

  /**
   * Get top rated marvel hero
   * @param {function}  UserHeroController.bestMarverHero introduce our class where the UserHero controller are and indicate its specific function
   */

  router.get('/bestMarverHero', UserHeroController.bestMarverHero)

  /**
   * Get top rated DC hero
   * @param {function}  UserHeroController.bestDCHero introduce our class where the UserHero controller are and indicate its specific function
   */

  router.get('/bestDCHero', UserHeroController.bestDCHero)

  /**
   * Get the most followed heroes
   * @param {function}  UserHeroController.mostFollowHeros introduce our class where the UserHero controller are and indicate its specific function
   */

  router.get('/mostFollowHeros', UserHeroController.mostFollowHeros)

  /**
   * Get the relationship of the hero and the user
   * @param {function}  UserHeroController.getHeroUsu introduce our class where the UserHero controller are and indicate its specific function
   */

  router.get('/getHeroUsu/:idUsu/:idHero', UserHeroController.getHeroUsu)

  /**
   * Get all the comments from a hero
   * @param {function}  UserHeroController.getHeroComments introduce our class where the UserHero controller are and indicate its specific function
   */

  router.get('/getHeroComments/:idHero', UserHeroController.getHeroComments)

  /**
   * Get the hero's average score
   * @param {function}  UserHeroController.getHeroRateScore introduce our class where the UserHero controller are and indicate its specific function
   */

  router.get('/getHeroRateScore/:idHero', UserHeroController.getHeroRateScore)

  // // modifyCHerocomment
  // router.put('/modifyCHero', UserHeroController.modifyCHero);

  /**
   * Get top rated DC hero
   * @param {function}  UserHeroController.bestOTHero introduce our class where the UserHero controller are and indicate its specific function
   */

  router.get('/bestOTHero', UserHeroController.bestOTHero)


  return router
}
