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
        // return res.send(hero);
        return res.json(hero);

    }
  
    async getWinner(req, res) {
        const { idHero } = req.params;
        const { idHero2 } = req.params;
        const heroWin = await _heroService.getWinner(idHero,idHero2);
        //    JSON.stringify(user)
        return res.json(heroWin);
        // return res.send(heroWin);

    }

    async  mostIntelligence(req, res) {
        const mostI = await _heroService.mostIntelligence();
        //    JSON.stringify(user)
        return res.json(mostI[0]);
        // return res.send(mostI[0]);

    }

    async  mostStrength(req, res) {
        const mostS = await _heroService.mostStrength();
        //    JSON.stringify(user)
        return res.json(mostS[0]);
        // return res.send(mostS[0]);

    }

    async  mostSpeed(req, res) {
        const mostSp = await _heroService.mostSpeed();
        //    JSON.stringify(user)
        return res.json(mostSp[0]);
    }

    async mostDurability(req, res) {
        const mostD = await _heroService.mostDurability();
        //    JSON.stringify(user)
        return res.json(mostD[0]);
    }

    async mostPower(req, res) {
        const mostP = await _heroService.mostPower();
        //    JSON.stringify(user)
        return res.json(mostP[0]);
    }

    async mostCombat(req, res) {
        const mostC = await _heroService.mostCombat();
        //    JSON.stringify(user)
        return res.json(mostC[0]);
    }

    async newHeros(req, res) {
        const mostC = await _heroService.newHeros();
        //    JSON.stringify(user)
        return res.json(mostC);
    }

    async allMarvelHeroes(req, res) {
        const allMarvel = await _heroService.allMarvelHeroes();
        //    JSON.stringify(user)
        return res.json(allMarvel);
    }

    async allDCHeroes(req, res) {
        const allDC = await _heroService.allDCHeroes();
        //    JSON.stringify(user)
        return res.json(allDC);
    }

      //obtener imagenes de heroes para perfil
//   router.get('/profileImgHeroes', HeroController.profileImgHeroes);

  async profileImgHeroes(req, res) {
    const profileImg = await _heroService.profileImgHeroes();
    //    JSON.stringify(user)
    return res.json(profileImg);
}


async searchHeroByName(req, res) {
    const { name } = req.params;
    const hero = await _heroService.searchHeroByName(name);
    //    JSON.stringify(user)
    // console.log('llego aqui'+ name)
    // return res.send(hero);
    return res.json(hero);

}
}

module.exports = HeroController;