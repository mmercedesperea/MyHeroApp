const express = require('express');
const cors = require('cors');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');

var bodyParser = require("body-parser");



// module.exports = function ({ HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes, AuthRoutes }) {
    module.exports = function ({ UserRoutes,  AuthRouters, ApiHeroRoute, HeroRoute, UserHeroRoute}) {

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

    // apiRoutes.use('/home', HomeRoutes);
    apiRoutes.use('/user', UserRoutes);
    // apiRoutes.use('/idea', IdeaRoutes);
    // apiRoutes.use('/comment', CommentRoutes);
    apiRoutes.use('/auth', AuthRouters);
    apiRoutes.use('/apiHero', ApiHeroRoute);
    apiRoutes.use('/hero', HeroRoute);
    apiRoutes.use('/userHero', UserHeroRoute);

    // todas nuestras rutas utilizaran de base la siguiente ruta
    router.use('/api', apiRoutes);


    // router.use(NotFoundMiddleware);
    // router.use(ErrorMiddleware);

    return router;
}