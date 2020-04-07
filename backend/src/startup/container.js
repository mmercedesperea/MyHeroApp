// Para la configuracion del contenedor de inyeccion de dependencias usamos awilix
const { createContainer, asClass, asValue, asFunction } = require("awilix");


// config
const config = require('../config');
const server = require('./index');

// routes
const { UserRoutes, AuthRouters } = require('../routes/index.routes');
const Routes = require('../routes');

// DB
const DB = require('../database/db');


// services
const { UserService,  AuthService} = require("../services");

// repositories
const { UserRepository } = require('../repositories');

// controllers
const { UserController,AuthController } = require('../controllers');

//models
const { User } = require('../models');

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
        AuthService: asClass(AuthService).singleton()
    })
    .register({
        // bind se utiliza para que express a la hora de llamar un controlador el scope se mantenga
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController:  asClass(AuthController.bind(AuthController)).singleton(),

    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRouters: asFunction(AuthRouters).singleton(),

    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
    })
    .register({ User: asValue(User) })

module.exports = container;