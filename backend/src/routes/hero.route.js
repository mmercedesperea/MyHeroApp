const { Router } = require('express');

module.exports = function ({ HeroController }) {
  const router = Router();
  //obtener un hero
  router.get('/:idHero', HeroController.get);

  // //obtener un hero
  // router.get('/:idHero', HeroController.get);
  
  //obtener un heroe ganador
  router.get('/getWinner/:idHero/idHero2', HeroController.getWinner);

  //obtener el heroe mas inteligente
  router.get('/stats/mostIntelligence', HeroController.mostIntelligence);
  
  //obtener el heroe mas fuerte
  router.get('/stats/mostStrength', HeroController.mostStrength);
  
  //obtener el heroe mas rapido
  router.get('/stats/mostSpeed', HeroController.mostSpeed);
  
  //obtener el heroe mas durability
  router.get('/stats/mostDurability', HeroController.mostDurability);

  //obtener el heroe mas poder
  router.get('/stats/mostPower', HeroController.mostPower);
  
  //obtener el heroe mas combate
  router.get('/stats/mostCombat', HeroController.mostCombat);

  //obtener ultimos heroes añadidos
  router.get('/new/heros', HeroController.newHeros);
  

  return router;
};