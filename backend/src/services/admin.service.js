const BaseService = require('./base.service');
let _UserObj = null;
let _HeroObj = null;
// let _userOBJ = null;
class AdminService extends BaseService {
    constructor({ User, Hero }) {
        super(User, Hero);
        _UserObj = User;
        _HeroObj = Hero;
    }

    async newHero(entity) {

        if (!entity) {
            const error = new Error();
            error.status = 400;
            error.message = 'entity must be sent';
            throw error;
        }

        return await _HeroObj.newHero(entity);

    }


    async modifyHero(idHero, entity) {
        if (!idHero) {
            const error = new Error();
            error.status = 400;
            error.message = 'idHero must be sent';
            throw error;
        }
        if (!entity) {
            const error = new Error();
            error.status = 400;
            error.message = 'entity must be sent';
            throw error;
        }

        return await _HeroObj.modifyHero(idHero, entity);

    }

    async deleteUser(idUsu) {
        if (!idUsu) {
            const error = new Error();
            error.status = 400;
            error.message = 'idUsu must be sent';
            throw error;
        }

        return await _UserObj.deleteUser(idUsu);

    }

    async allUsers() {
        // en caso de que exista la id vamos a buscar esa entidad
        const currentEntity = await _UserObj.allUsers();
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'Entity must be sent';
            throw error;
        }
        return currentEntity;
    }


}

module.exports = AdminService;