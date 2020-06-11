/**
 * express module
 * @const
 */
const { Router } = require('express')

/**
 * to manage the routes that affect heros
 * @param {class} HeroController we introduce our class where the Hero controller are
 */
module.exports = function ({ HeroController }) {
  const router = Router()

  /**
   * Get hero by id
   * @param {class} HeroController.get we introduce our class where the Hero controller are
   */
  router.get('/getByid/:idHero', HeroController.get)

  /**
   * Get winner hero
   * @param {class} HeroController.getWinner we introduce our class where the Hero controller are
   */
  router.get('/getWinner/:idHero/:idHero2', HeroController.getWinner)

  /**
   * Get most intelligent hero
   * @param {class} HeroController.mostIntelligence we introduce our class where the Hero controller are
   */
  router.get('/stats/mostIntelligence', HeroController.mostIntelligence)

  /**
   * Get strongest hero
   * @param {class} HeroController.mostStrength we introduce our class where the Hero controller are
   */
  router.get('/stats/mostStrength', HeroController.mostStrength)

  /**
   * Get fastest hero
   * @param {class} HeroController.mostSpeed we introduce our class where the Hero controller are
   */
  router.get('/stats/mostSpeed', HeroController.mostSpeed)

  /**
   * Get hero with most durability
   * @param {class} HeroController.mostDurability we introduce our class where the Hero controller are
   */
  router.get('/stats/mostDurability', HeroController.mostDurability)

  /**
   * Get most powerful hero
   * @param {class} HeroController.mostPower we introduce our class where the Hero controller are
   */
  router.get('/stats/mostPower', HeroController.mostPower)

  /**
   * Get hero with highest combat stats
   * @param {class} HeroController.mostCombat we introduce our class where the Hero controller are
   */
  router.get('/stats/mostCombat', HeroController.mostCombat)

  /**
   * Get new heroes in db
   * @param {class} HeroController.newHeros we introduce our class where the Hero controller are
   */
  router.get('/new/heros', HeroController.newHeros)

  /**
   * Get all marvel heroes
   * @param {class} HeroController.allMarvelHeroes we introduce our class where the Hero controller are
   */
  router.get('/all/MarvelHeroes', HeroController.allMarvelHeroes)

  /**
   * Get all DC heroes
   * @param {class} HeroController.allDCHeroes we introduce our class where the Hero controller are
   */
  router.get('/all/DCHeroes', HeroController.allDCHeroes)

  /**
   * Get heroes img for profile
   * @param {class} HeroController.profileImgHeroes we introduce our class where the Hero controller are
   */
  router.get('/img/profileImgHeroes', HeroController.profileImgHeroes)

  /**
   * Get hero by name
   * @param {class} HeroController.searchHeroByName we introduce our class where the Hero controller are
   */
  router.get('/searchHeroByName/:name', HeroController.searchHeroByName)

  return router
}
