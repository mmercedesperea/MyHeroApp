const BaseService = require('./base.service');
let _heroRepository = null;
let _heroOBJ = null;

class HeroService extends BaseService {
    constructor({ HeroRepository, Hero }) {
        super(HeroRepository);
        _heroRepository = HeroRepository;
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
        return await _heroRepository.getWinner(idHero, idHero2);
    }

    async   mostIntelligence() {
        const currentEntity = await _heroRepository.mostIntelligence();
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
        const currentEntity = await _heroRepository.mostStrength();
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
        const currentEntity = await _heroRepository.mostSpeed();
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
        const currentEntity = await _heroRepository.mostDurability();
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
        const currentEntity = await _heroRepository.mostPower();
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
        const currentEntity = await _heroRepository.mostCombat();
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
        const currentEntity = await _heroRepository.newHeros();
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