/**
 * We export the module with the elements that compose it
 */
module.exports = {
    UserService: require('./user.service'),
    AuthService: require('./auth.service'),
    ApiHeroService: require('./apiHero.service'),
    HeroService: require('./hero.service'),
    UserHeroService: require('./userHero.service'),
    TeamService: require('./team.service'),
    AdminService: require('./admin.service')
}