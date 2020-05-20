const BaseService = require('./base.service');
let _teamObj = null;
// let _userOBJ = null;
class TeamService extends BaseService {
    constructor({ Team }) {
        super(Team);
        _teamObj = Team;
    }

    // traer el numero de miembros
    async checkTeam(idTeam) {
        if (!idTeam) {
            const error = new Error();
            error.status = 400;
            error.message = 'idTeam must be sent';
            throw error;
        }

        const numMembers = await _teamObj.checkTeam(idTeam);

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

        return await _teamObj.addMember(idTeam, entity);

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

        return await _teamObj.deleteMember(idTeam, entity);

    }

    // bestTeam

    async bestTeam() {
        // en caso de que exista la id vamos a buscar esa entidad
        const currentEntity = await _teamObj.bestTeam();
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

    async getTeamUsu(id) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'id must be sent';
            throw error;
        }
        // en caso de que exista la id vamos a buscar esa entidad
        const currentEntity = await _teamObj.getTeamUsu(id);
        // console.log(currentEntity[0].idTeam)
        // console.log('LA ENTIDAD A VER ESSS' +currentEntity)
        // console.log('LA ENTIDAD A VER ESSS' +id)
        // JSON.stringify(currentEntity);
        if (!currentEntity) {
            return null;
        }
        return currentEntity;
    }

    async getTeamInfo(idUsu) {
        if (!idUsu) {
            const error = new Error();
            error.status = 400;
            error.message = 'idusu must be sent';
            throw error;
        }
        // en caso de que exista la id vamos a buscar esa entidad
        const currentEntity = await _teamObj.getTeamInfo(idUsu);
        // console.log(currentEntity)
        // console.log(currentEntity[0].idTeam)
        // JSON.stringify(currentEntity);
        if (!currentEntity) {
            return null;
        }
        return currentEntity[0];
    }


    async getTeamWinner(idTeam1, idTeam2) {
        if (!idTeam1) {
            const error = new Error();
            error.status = 400;
            error.message = 'idTeam must be sent';
            throw error;
        }

        if (!idTeam2) {
            const error = new Error();
            error.status = 400;
            error.message = 'idteam must be sent';
            throw error;
        }
        return await _teamObj.getTeamWinner(idTeam1, idTeam2);
    }

    // searchTeam
    async  searchTeam(teamName) {
        if (!teamName) {
            const error = new Error();
            error.status = 400;
            error.message = 'teamName must be sent';
            throw error;
        }
        // en caso de que exista la id vamos a buscar esa entidad
        const currentEntity = await _teamObj.searchTeam(teamName);
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            return null;
        }
        return currentEntity;
    }


}

module.exports = TeamService;