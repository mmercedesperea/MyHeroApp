const { Router } = require('express');


module.exports= function({UserHeroController}){

    const router = Router();

    // Follow a hero
    router.post('/followHero', UserHeroController.followHero);

return router;
}