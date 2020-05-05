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

    // //obtener el voto de un heroe de un usuario
    // router.get('/voteHero/:idUsu/:idHero', UserHeroController.getVoteHero);

    // comment
    router.put('/commentHero', UserHeroController.commentHero);

    // //obtener el comentario de un heroe de un usuario
    // router.get('/commentHero/:idUsu/:idHero', UserHeroController.getCommentHero);

    // delete comment
    router.put('/deleteCHero', UserHeroController.deleteCHero);

    // obtener todos los heroes favoritos
    router.get('/allHerosFav/:idUsu', UserHeroController.allHerosFav);

    //obtener todos los heroes follow
    router.get('/allHerosFoll/:idUsu', UserHeroController.allHerosFoll);

     //obtener hero de marvel mas votado
     router.get('/bestMarverHero', UserHeroController.bestMarverHero);

     //obtener hero de Dc mas votado
     router.get('/bestDCHero', UserHeroController.bestDCHero);

     // obtener los heroes más seguidos
    router.get('/mostFollowHeros', UserHeroController.mostFollowHeros);

     //obtener la relacion del heroe y el usuario
    router.get('/getHeroUsu/:idUsu/:idHero', UserHeroController.getHeroUsu);

    return router;
}