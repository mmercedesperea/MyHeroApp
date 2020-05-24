/**
 * We export the module with the elements that compose it
 */
module.exports = {
    UserController: require('./user.controller'),
    AuthController: require('./auth.controller'),
    ApiHeroController: require('./apiHero.controller'),
    HeroController: require('./hero.controller'),
    UserHeroController: require('./userHero.controller'),
    TeamController: require('./team.controller'),
    AdminController: require('./admin.controller')
}