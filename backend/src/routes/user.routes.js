const { Router } = require('express');

// para asegurarnos de que el usuario este autentificado para acceder a ciertas rutas
const { AuthMiddleware, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');

module.exports = function ({ UserController }) {
    const router = Router();

    //obtener un usuario
    router.get('/:idUsu', UserController.get);


    return router;
};