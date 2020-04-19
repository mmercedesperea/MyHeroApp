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
        return await   _heroRepository.getWinner(idHero, idHero2);
    }


}

module.exports = HeroService;