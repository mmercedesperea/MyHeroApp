const express = require('express');
const cors = require('cors');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');



// module.exports = function ({ HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes, AuthRoutes }) {
    module.exports = function ({ UserRoutes}) {

    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        // para pasar las peticiones a json
        .use(express.json())
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
    // apiRoutes.use('/auth', AuthRoutes)

    // todas nuestras rutas utilizaran de base la siguiente ruta
    router.use('/api', apiRoutes);


    // router.use(NotFoundMiddleware);
    // router.use(ErrorMiddleware);

    return router;
}