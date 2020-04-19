let _userHeroService = null;

class UserHeroController{
    constructor({UserHeroService}){
        _userHeroService = UserHeroService;
    }

    async  followHero(req, res) {
        const { body } = req;
        const  followHero = await _userHeroService.followHero(body);
        console.log( followHero)
        return res.status(201).send({message: followHero});
    }


    async unfollowHero(req, res) {
        const { body } = req;
        const  unfollowHero = await _userHeroService.unfollowHero(body);
        console.log( unfollowHero)
        return res.status(201).send({message: unfollowHero});
    }

    async  favorite(req, res) {
        const { body } = req;
        const  favorite = await _userHeroService.favorite(body);
        console.log( favorite)
        return res.status(201).send({message: favorite});
    }


    async unfavorite(req, res) {
        const { body } = req;
        const  unfavorite = await _userHeroService.unfavorite(body);
        console.log( unfavorite)
        return res.status(201).send({message: unfavorite});
    }

    async voteHero(req, res) {
        const { body } = req;
        const  voteHero = await _userHeroService.voteHero(body);
        console.log( voteHero)
        return res.status(201).send({message: voteHero});
    }

    async commentHero(req, res) {
        const { body } = req;
        const  commentHero = await _userHeroService.commentHero(body);
        console.log( commentHero)
        return res.status(201).send({message: commentHero});
    }

    async deleteCHero(req, res) {
        const { body } = req;
        const  deleteCHero = await _userHeroService.deleteCHero(body);
        console.log(deleteCHero)
        return res.status(201).send({message: deleteCHero});
    }

    //obtener todos los heroes favoritos
    async allHerosFav(req, res) {
        const { idUsu } = req.params;
        const allHeros = await _userHeroService.getFav(idUsu);
        //    JSON.stringify(user)
        return res.send(allHeros);
    }

    //obtener todos los heroes siguiendo
    async allHerosFoll(req, res) {
        const { idUsu } = req.params;
        const allHeros = await _userHeroService.get(idUsu);
        //    JSON.stringify(user)
        return res.send(allHeros);
    }

    
     //obtener tel comentario de un usuario sobre un hero
     async getCommentHero(req, res) {
        const { idUsu } = req.params;
        const { idHero } = req.params;
        const allHeros = await _userHeroService.getCommentHero(idUsu,idHero);
        //    JSON.stringify(user)
        return res.send(allHeros);
    }

    

    //obtener el voto de un usuario sobre un hero
    async getVoteHero(req, res) {
        const { idUsu } = req.params;
        const { idHero } = req.params;
        const allHeros = await _userHeroService.getVoteHero(idUsu,idHero);
        //    JSON.stringify(user)
        return res.send(allHeros);
    }

    
    async bestMarverHero(req, res) {
        const bestM = await _userHeroService.bestMarverHero();
        //    JSON.stringify(user)
        return res.send(bestM);
    }

    async bestDCHero(req, res) {
        const bestDC = await _userHeroService.bestDCHero();
        //    JSON.stringify(user)
        return res.send(bestDC);
    }



}

module.exports = UserHeroController;