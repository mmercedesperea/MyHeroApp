/**
 * For the configuration of the dependency injection container we use awilix
 */
const { createContainer, asClass, asValue, asFunction } = require("awilix");


/**
 * we bring the route to the configuration
 */
const config = require('../config');
const server = require('./index');

/**
 * we bring the routes of our api
 */
const { AdminRoute, UserRoutes, AuthRouters, ApiHeroRoute, HeroRoute, UserHeroRoute, TeamRoute } = require('../routes/index.routes');
const Routes = require('../routes');

/**
 * we bring the route to the DB conexion
 */
const DB = require('../database/db');


/**
 * We bring the routes of our services where it is indicated what actions should be taken according to the data that we receive from the different requests to our api
 */
const {  AdminService,UserService, AuthService, ApiHeroService, HeroService, UserHeroService, TeamService } = require("../services");


/**
 * 
we bring the routes of our controllers, who are indicated to manage what the routes bring us and send it to the appropriate services
 */
const { AdminController ,UserController, AuthController, ApiHeroController, HeroController, UserHeroController, TeamController } = require('../controllers');

/**
 * 
we bring the routes of our models
 */
const { User, Hero, UserHero, Team } = require('../models');

/**
 * we create our container where we define our elements
 * We create our container where we define our elements and inject the different elements that make up our API to be able to work with them from where we want
 * In the container we indicate if what we bring is a class, a function or a value and that it is a singleton type to make sure that there is only one instance of that element
 */
const container = createContainer();

container
    .register({
        server: asClass(server).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config),
        DB: asClass(DB)

    })
    .register({
        UserService: asClass(UserService).singleton(),
        AuthService: asClass(AuthService).singleton(),
        ApiHeroService: asClass(ApiHeroService).singleton(),
        HeroService: asClass(HeroService).singleton(),
        UserHeroService: asClass(UserHeroService).singleton(),
        TeamService: asClass(TeamService).singleton(),
        AdminService: asClass(  AdminService).singleton()
    })
    .register({
        // bind is used so that when calling a controller the scope is maintained
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        ApiHeroController: asClass(ApiHeroController.bind(ApiHeroController)).singleton(),
        HeroController: asClass(HeroController.bind(HeroController)).singleton(),
        UserHeroController: asClass(UserHeroController.bind(UserHeroController)).singleton(),
        TeamController: asClass(TeamController.bind(TeamController)).singleton(),
        AdminController: asClass(AdminController.bind(AdminController)).singleton()
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRouters: asFunction(AuthRouters).singleton(),
        ApiHeroRoute: asFunction(ApiHeroRoute).singleton(),
        HeroRoute: asFunction(HeroRoute).singleton(),
        UserHeroRoute: asFunction(UserHeroRoute).singleton(),
        TeamRoute: asFunction(TeamRoute).singleton(),
        AdminRoute: asFunction(AdminRoute).singleton()
    })
   
    .register({ Team: asClass(Team), User: asClass(User), Hero: asClass(Hero), UserHero: asClass(UserHero) })

module.exports = container;