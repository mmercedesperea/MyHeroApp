let table = null;
let _DB = null;
let _ApiHeroRepository =null;

class HeroRepository {
    constructor({ DB,ApiHeroRepository }) {
        table = "heroes";
        _ApiHeroRepository =ApiHeroRepository;
        _DB = DB;
        // super(DB, table)
    }

    //obtener una entidad por id
    async get(idHero) {
        // console.log(this.table)
        console.log('LA ID ESSS' + idHero)

        var Hero = await _DB.consulta(`SELECT * from ${table} WHERE idHero =${idHero}`)
        console.log(Hero);
        if (Hero != null) {
            return Hero[0];
        } else {

            // buscamos en la api y lo guardamos
            var ApiHero = await _ApiHeroRepository.getHeroByid(idHero);
            //buscamos de nuevo

            return ApiHero;
        }
        // return await _DB.consulta(`SELECT * from ${table} WHERE idHero =${idHero}`)
        // return await this.DB.consulta(this.table, id);

    }
}

module.exports = HeroRepository;