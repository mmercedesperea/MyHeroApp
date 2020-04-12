const { Router } = require('express');

module.exports = function ({ ApiHeroController }) {

    const router = Router();

    //obtener un heroe por el nombre
    router.get('/search/:name', ApiHeroController.get);

    // obtener un heroe por id
    router.get('/searchByid/:id', ApiHeroController.getHeroByid);



    return router;
};