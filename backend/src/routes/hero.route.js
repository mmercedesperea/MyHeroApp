const { Router } = require('express');

module.exports = function({HeroController}){
    const router = Router();
      //obtener un hero
      router.get('/:idHero', HeroController.get);


      //obtener un hero winner
      router.get('/:idHero/:idHero2', HeroController.getWinner);

      return router;
};