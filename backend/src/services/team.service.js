const BaseService = require('./base.service');
let _teamRepository = null;
// let _userOBJ = null;
class TeamService extends BaseService {
    constructor({ TeamRepository }) {
        super(TeamRepository);
        _teamRepository = TeamRepository;
    }

    // traer el numero de miembros
    async checkTeam(idTeam) {
        if (!idTeam) {
            const error = new Error();
            error.status = 400;
            error.message = 'idTeam must be sent';
            throw error;
        }

        const numMembers = await _teamRepository.checkTeam(idTeam);

        // devuelve true si  se tienen todos los miembros del equipo
        if (numMembers) {
            return true;
        }
        // devuelve false si no se tienen todos los miembros del equipo
        return false;
    }

   

    async addMember(idTeam, entity) {
        if (!idTeam) {
            const error = new Error();
            error.status = 400;
            error.message = 'idTeam must be sent';
            throw error;
        }
        if (!entity) {
            const error = new Error();
            error.status = 400;
            error.message = 'entity must be sent';
            throw error;
        }

        return await _teamRepository.addMember(idTeam,entity);

    }

    async deleteMember(idTeam, entity) {
        if (!idTeam) {
            const error = new Error();
            error.status = 400;
            error.message = 'idTeam must be sent';
            throw error;
        }
        if (!entity) {
            const error = new Error();
            error.status = 400;
            error.message = 'entity must be sent';
            throw error;
        }

        return await _teamRepository.deleteMember(idTeam,entity);

    }

    // bestTeam

    async bestTeam() {
        // en caso de que exista la id vamos a buscar esa entidad
        const currentEntity = await _teamRepository.bestTeam();
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

module.exports = TeamService;