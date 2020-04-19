let table = null;
let _DB = null;
let _ApiHeroRepository = null;

class HeroRepository {
    constructor({ DB, ApiHeroRepository }) {
        table = "heroes";
        _ApiHeroRepository = ApiHeroRepository;
        _DB = DB;
        // super(DB, table)
    }

    //obtener una entidad por id
    async get(idHero) {
        // console.log(this.table)
        console.log('LA ID ESSS' + idHero)
        // se busca el heroe en la bd
        var Hero = await _DB.consulta(`SELECT * from ${table} WHERE idHero =${idHero}`)

        console.log(Hero);
        // si heroe no es nul
        if (Hero != null) {
            // se devuelve ese heroe
            return Hero[0];
            // si el heroe es null, por lo tanto no esta en nuestra bd
        } else {

            // buscamos en la api y lo guardamos
            var ApiHero = await _ApiHeroRepository.getHeroByid(idHero);

            // devolvemos el heroe

            return ApiHero;
        }

    }


    async getWinner(idHero, idHero2) {

        // se busca el heroe en la bd
        var Hero1 = await _DB.consulta(`SELECT SUM (intelligence + strength + speed +durability +power +combat) as totalPoints,idHero,name,image from ${table} WHERE idHero =${idHero}`)

        // se busca el heroe2 en la bd
        var Hero2 = await _DB.consulta(`SELECT SUM (intelligence + strength + speed +durability +power +combat) as totalPoints,idHero,name,image from ${table} WHERE idHero =${idHero2}`)

        // si los puntos totales del hero1 son mayores que el de hero2 devuelve ese
        if (Hero1[0].totalPoints > Hero2[0].totalPoints) {
            return Hero1[0];
        } else {
            return Hero2[0];
        }

    }
}

module.exports = HeroRepository;