let _teamService = null;


class TeamController{
    constructor({TeamService}){
        _teamService= TeamService;
    }

    async  createTeam(req, res) {
        const { body } = req;
        const  createTeam = await _teamService.create(body);
        console.log(createTeam)
        return res.status(201).send({message: createTeam});
    }

    async checkTeam(req, res) {
        const { idTeam } = req.params;
        const team = await _teamService.checkTeam(idTeam);
        //    JSON.stringify(team)
        return res.send(team);
    }

    async getTeam(req, res) {
        const { idTeam } = req.params;
        const team = await _teamService.get(idTeam);
        //    JSON.stringify(team)
        return res.send(team);
    }

    async  addMenber(req, res) {
        const { idTeam } = req.params;
        const { body } = req;
        const  addMenber = await _teamService.update(idTeam,body);
        console.log(addMenber)
        return res.status(201).send({message:addMenber});
    }

    async  deleteMenber(req, res) {
        const { idTeam } = req.params;
        const { idMenber} = req.params;
        const  deleteMenber = await _teamService.deleteMenber(idTeam,idMenber);
        console.log(deleteMenber)
        return res.status(201).send({message: deleteMenber});
    }

}


module.exports = TeamController;