const BaseService = require('./base.service');

let _userHeroRepository = null;
let _userHeroOBJ = null;

class UserHeroService extends BaseService {
    constructor({ UserHeroRepository, UserHero }) {
        super(UserHeroRepository);
        _userHeroRepository = UserHeroRepository;
        _userHeroOBJ = UserHero;
    }

    async followHero(body) {

        if (!body.idUsu) {
            const error = new Error();
            error.status = 400;
            error.message = 'id must be sent';
            throw error;
        }

        if (!body.idHero) {
            const error = new Error();
            error.status = 400;
            error.message = 'id hero must be sent';
            throw error;
        }

        // comprobamos si ya existe una relacion entre el usuario y el hero
        const matchUserHero = await _userHeroOBJ.match(body);

        if (!matchUserHero) {

            // insertamos al usuario con el hero
            const insertUserHero = await _userHeroRepository.InsertUH(body);

        }

        if (matchUserHero || insertUserHero) {

            // actualizamos el campo de follow a true
            return await _userHeroRepository.followHero(body);

        }



    }

}

module.exports = UserHeroService