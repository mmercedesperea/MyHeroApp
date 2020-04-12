let _heroService = null;

class HeroController{

    constructor({ HeroService }) {
        _heroService = HeroService;
    }


    //obtener hero por id
    async get(req, res) {
        const { idHero } = req.params;
        const hero = await _heroService.get(idHero);
        //    JSON.stringify(user)
        return res.send(hero);
    }
}

module.exports = HeroController;