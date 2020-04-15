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

}

module.exports = UserHeroController;