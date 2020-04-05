// Para la configuracion del contenedor de inyeccion de dependencias usamos awilix
const { createContainer, asClass, asValue, asFunction } = require("awilix");



// config
const config = require('../config');
const server = require('./index');

// routes
const Routes = require('../routes');


const container = createContainer();

container
    .register({
        server: asClass(server).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    });


module.exports = container;