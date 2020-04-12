const BaseService = require('./base.service');
let _heroRepository = null;
let _heroOBJ=null;

class HeroService extends BaseService{
    constructor({HeroRepository, Hero}){
        super(HeroRepository);
        _heroRepository = HeroRepository;
        _heroOBJ = Hero;
    }

    // //obtener una entidad por id
    // async get(id) {
    //     // console.log(this.table)
    //     // console.log('LA ID ESSS' + id)
    //     return await this.DB.consulta(`SELECT * from ${this.table} WHERE idUsu =${id}`)
    //     // return await this.DB.consulta(this.table, id);

    // }

}

module.exports = HeroService;