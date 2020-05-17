const express = require('express');
const cors = require('cors');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');

// var bodyParser = require("body-parser");

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger/swagger.json');

module.exports = function ({ AdminRoute,UserRoutes, AuthRouters, ApiHeroRoute, HeroRoute, UserHeroRoute, TeamRoute }) {

    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        // para pasar las peticiones a json
        .use(express.json())
        .use(express.urlencoded({ extended: false }))
        // .use(bodyParser.json())
        // .use(
        //     bodyParser.urlencoded({ extended: false })
        // )
        // para evitar problemas de cors
        .use(cors())
    // evitar problemas de seguridad
    // .use(helmet())
    // 
    // .use(compression());
    apiRoutes.use('/user', UserRoutes);
    apiRoutes.use('/auth', AuthRouters);
    apiRoutes.use('/apiHero', ApiHeroRoute);
    apiRoutes.use('/hero', HeroRoute);
    apiRoutes.use('/userHero', UserHeroRoute);
    apiRoutes.use('/team', TeamRoute);
    apiRoutes.use('/admin', AdminRoute);
    //swagger route
    apiRoutes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    // todas nuestras rutas utilizaran de base la siguiente ruta
    router.use('/api', apiRoutes);


    // router.use(NotFoundMiddleware);
    // router.use(ErrorMiddleware);

    return router;
}