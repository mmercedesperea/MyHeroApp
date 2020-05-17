const { Router } = require('express');

// para asegurarnos de que el usuario este autentificado para acceder a ciertas rutas
const { AuthMiddleware,AdminAuth, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');


module.exports = function ({ AdminController }) {

    const router = Router();

    // Create new hero
    router.post('/newHero',[AuthMiddleware,AdminAuth.isAdmin], AdminController.newHero);

    //modify hero
    router.put('/modifyHero/:idHero',[AuthMiddleware,AdminAuth.isAdmin], AdminController.modifyHero);

    // Delete user
    router.delete('/:iUsu',[AuthMiddleware,AdminAuth.isAdmin],  AdminController.deleteUser);

    // get all users
    router.get('/allUsers',[AuthMiddleware,AdminAuth.isAdmin],  AdminController.allUsers);


    return router;
}

