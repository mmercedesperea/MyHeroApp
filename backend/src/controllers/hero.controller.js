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
  
    async getWinner(req, res) {
        const { idHero } = req.params;
        const { idHero2 } = req.params;
        const heroWin = await _heroService.getWinner(idHero,idHero2);
        //    JSON.stringify(user)
        return res.send(heroWin[0]);
    }

    async  mostIntelligence(req, res) {
        const mostI = await _heroService.mostIntelligence();
        //    JSON.stringify(user)
        return res.send(mostI[0]);
    }

    async  mostStrength(req, res) {
        const mostS = await _heroService.mostStrength();
        //    JSON.stringify(user)
        return res.send(mostS[0]);
    }

    async  mostSpeed(req, res) {
        const mostSp = await _heroService.mostSpeed();
        //    JSON.stringify(user)
        return res.send(mostSp[0]);
    }

    async mostDurability(req, res) {
        const mostD = await _heroService.mostDurability();
        //    JSON.stringify(user)
        return res.send(mostD[0]);
    }

    async mostPower(req, res) {
        const mostP = await _heroService.mostPower();
        //    JSON.stringify(user)
        return res.send(mostP[0]);
    }

    async mostCombat(req, res) {
        const mostC = await _heroService.mostCombat();
        //    JSON.stringify(user)
        return res.send(mostC[0]);
    }

    async newHeros(req, res) {
        const mostC = await _heroService.newHeros();
        //    JSON.stringify(user)
        return res.send(mostC);
    }

    async allMarvelHeroes(req, res) {
        const allMarvel = await _heroService.allMarvelHeroes();
        //    JSON.stringify(user)
        return res.send(allMarvel);
    }

    async allDCHeroes(req, res) {
        const allDC = await _heroService.allDCHeroes();
        //    JSON.stringify(user)
        return res.send(allDC);
    }

}

module.exports = HeroController;