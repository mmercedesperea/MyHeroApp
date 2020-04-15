const BaseService = require('./base.service');
let _teamRepository = null;
// let _userOBJ = null;
class TeamService extends BaseService {
    constructor(TeamRepository){
        super(TeamRepository);
        _teamRepository = TeamRepository;
    }

    // traer el numero de miembros
async checkTeam(idTeam){

    if (!idTeam) {
        const error = new Error();
        error.status = 400;
        error.message = 'idTeam must be sent';
        throw error;
    }
    return await _teamRepository.checkTeam(idTeam);
}

async deleteMenber(idTeam,idMenber){
    if (!idTeam) {
        const error = new Error();
        error.status = 400;
        error.message = 'idTeam must be sent';
        throw error;
    }

    if (!idMenber) {
        const error = new Error();
        error.status = 400;
        error.message = 'idMenber must be sent';
        throw error;
    }

    return await _teamRepository.deleteMenber(idTeam,idMenber);

}



}

module.exports = TeamService;