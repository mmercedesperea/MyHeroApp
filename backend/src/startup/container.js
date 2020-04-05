// Para la configuracion del contenedor de inyeccion de dependencias usamos awilix
const { createContainer, asClass, asValue, asFunction } = require("awilix");


// config
const config = require('../config');
const server = require('./index');

// routes
const { UserRoutes } = require('../routes/index.routes');
const Routes = require('../routes');

// DB
const DB = require('../database/db');


// services
const { UserService } = require("../services");

// repositories
const { UserRepository } = require('../repositories');

// controllers
const { UserController } = require('../controllers');


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
    })
    .register({
        // bind se utiliza para que express a la hora de llamar un controlador el scope se mantenga
        UserController: asClass(UserController.bind(UserController)).singleton(),
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
    })
module.exports = container;