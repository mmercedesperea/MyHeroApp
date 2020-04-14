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

}

module.exports = UserHeroController;