const { Router } = require('express');


module.exports = function ({ UserHeroController }) {

    const router = Router();

    // Follow a hero
    router.put('/followHero', UserHeroController.followHero);

    // Unfollow a hero
    router.put('/unfollowHero', UserHeroController.unfollowHero);

    // favorite a hero
    router.put('/favorite', UserHeroController.favorite);

    // unfavorite a hero
    router.put('/unfavorite', UserHeroController.unfavorite);

    // vote
    router.put('/voteHero', UserHeroController.voteHero);

    // comment
    router.put('/commentHero', UserHeroController.commentHero);

    // delete comment
    router.put('/deleteCHero', UserHeroController.deleteCHero);


    // obtener todos los heroes favoritos

    //obtener todos los heroes follow

    return router;
}