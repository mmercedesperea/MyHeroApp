// Para la configuracion del contenedor de inyeccion de dependencias usamos awilix
const { createContainer, asClass, asValue, asFunction } = require("awilix");


// config
const config = require('../config');
const server = require('./index');

// routes
const { UserRoutes, AuthRouters, ApiHeroRoute,HeroRoute } = require('../routes/index.routes');
const Routes = require('../routes');

// DB
const DB = require('../database/db');


// services
const { UserService,  AuthService, ApiHeroService, HeroService} = require("../services");

// repositories
const { UserRepository, ApiHeroRepository,HeroRepository } = require('../repositories');

// controllers
const { UserController,AuthController, ApiHeroController,HeroController } = require('../controllers');

//models
const { User, Hero } = require('../models');

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
        HeroService:asClass(HeroService).singleton()
    })
    .register({
        // bind se utiliza para que express a la hora de llamar un controlador el scope se mantenga
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController:  asClass(AuthController.bind(AuthController)).singleton(),
        ApiHeroController: asClass(ApiHeroController.bind(ApiHeroController)).singleton(),
        HeroController:asClass(HeroController.bind(HeroController)).singleton(),
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRouters: asFunction(AuthRouters).singleton(),
        ApiHeroRoute: asFunction(ApiHeroRoute).singleton(),
        HeroRoute: asFunction(HeroRoute).singleton(),
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
        ApiHeroRepository: asClass(ApiHeroRepository).singleton(),
        HeroRepository: asClass(HeroRepository).singleton(),
    })
    .register({ User: asClass(User), Hero: asClass(Hero) })

module.exports = container;