/**
 * For the configuration of the dependency injection container we use awilix
 */
const { createContainer, asClass, asValue, asFunction } = require("awilix");


// config
const config = require('../config');
const server = require('./index');

// routes
const { AdminRoute, UserRoutes, AuthRouters, ApiHeroRoute, HeroRoute, UserHeroRoute, TeamRoute } = require('../routes/index.routes');
const Routes = require('../routes');

// DB
const DB = require('../database/db');


// services
const {  AdminService,UserService, AuthService, ApiHeroService, HeroService, UserHeroService, TeamService } = require("../services");


// controllers
const { AdminController ,UserController, AuthController, ApiHeroController, HeroController, UserHeroController, TeamController } = require('../controllers');

//models
const { User, Hero, UserHero, Team } = require('../models');

// creamos nuestro contenedor donde definimos nuestros elementos
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
        // bind se utiliza para que express a la hora de llamar un controlador el scope se mantenga
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