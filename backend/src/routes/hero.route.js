const { Router } = require('express');

module.exports = function({HeroController}){
    const router = Router();
      //obtener un hero
      router.get('/:idHero', HeroController.get);

      //obtener un hero
      router.get('/:idHero', HeroController.get);

      return router;
};