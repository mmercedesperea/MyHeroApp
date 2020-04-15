const BaseService = require('./base.service');
let _heroRepository = null;
let _heroOBJ=null;

class HeroService extends BaseService{
    constructor({HeroRepository, Hero}){
        super(HeroRepository);
        _heroRepository = HeroRepository;
        _heroOBJ = Hero;
    }


}

module.exports = HeroService;