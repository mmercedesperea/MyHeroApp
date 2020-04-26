const BaseService = require('./base.service');
let _heroOBJ = null;

class HeroService extends BaseService {
    constructor({  Hero }) {
        super(Hero);
        _heroOBJ = Hero;
    }


    // traer el heroe winner
    async getWinner(idHero, idHero2) {
        if (!idHero) {
            const error = new Error();
            error.status = 400;
            error.message = 'idHero must be sent';
            throw error;
        }

        if (!idHero2) {
            const error = new Error();
            error.status = 400;
            error.message = 'idHero2 must be sent';
            throw error;
        }
        return await _heroOBJ.getWinner(idHero, idHero2);
    }

    async   mostIntelligence() {
        const currentEntity = await _heroOBJ.mostIntelligence();
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'There is no heros';
            throw error;
        }
        return currentEntity;
    }

    async  mostStrength() {
        const currentEntity = await _heroOBJ.mostStrength();
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'There is no heros';
            throw error;
        }
        return currentEntity;
    }

    async  mostSpeed() {
        const currentEntity = await _heroOBJ.mostSpeed();
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'There is no heros';
            throw error;
        }
        return currentEntity;
    }

    async  mostDurability() {
        const currentEntity = await _heroOBJ.mostDurability();
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'There is no heros';
            throw error;
        }
        return currentEntity;
    }

    async  mostPower() {
        const currentEntity = await _heroOBJ.mostPower();
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'There is no heros';
            throw error;
        }
        return currentEntity;
    }

    async  mostCombat() {
        const currentEntity = await _heroOBJ.mostCombat();
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'There is no heros';
            throw error;
        }
        return currentEntity;
    }

    async  newHeros() {
        const currentEntity = await _heroOBJ.newHeros();
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'There is no heros';
            throw error;
        }
        return currentEntity;
    }

    async  allMarvelHeroes() {
        const currentEntity = await _heroOBJ.allMarvelHeroes();
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'There is no heros';
            throw error;
        }
        return currentEntity;
    }

    async  allDCHeroes() {
        const currentEntity = await _heroOBJ.allDCHeroes();
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'There is no heros';
            throw error;
        }
        return currentEntity;
    }





}

module.exports = HeroService;