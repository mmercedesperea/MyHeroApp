let _teamService = null;

class TeamController{
    constructor({TeamService}){
        _teamService= TeamService;
    }

    async  createTeam(req, res) {
        const { body } = req;
        const  createTeam = await _teamService.create(body);
        // console.log(createTeam)
        return res.status(201).send({message: createTeam});
    }

    async checkTeam(req, res) {
        const { idTeam } = req.params;
        const team = await _teamService.checkTeam(idTeam);
        //    JSON.stringify(team)
        return res.json(team);
    }

    async getTeam(req, res) {
        const { idTeam } = req.params;
        const team = await _teamService.get(idTeam);
        //    JSON.stringify(team)
        return res.json(team);
    }

    async getTeamUsu(req, res) {
        const { idUsu } = req.params;
        const team = await _teamService.getTeamUsu(idUsu);
        //    JSON.stringify(team)
        return res.json(team);
    }

    async  chageName(req, res) {
        const { idTeam } = req.params;
        const { body } = req;
        const  chageName = await _teamService.update(idTeam,body);
        console.log(chageName)
        return res.status(201).send({message:chageName});
    }

    async  addMember(req, res) {
        const { idTeam } = req.params;
        const { body } = req;
        const  addMember = await _teamService.addMember(idTeam,body);
        // console.log(addMember)
        return res.status(201).send({message:addMember});
    }

    async  deleteMember(req, res) {
        const { idTeam } = req.params;
        const { body } = req;
        const  deleteMember = await _teamService.deleteMember(idTeam,body);
        // console.log(deleteMember)
        return res.status(201).send({message: deleteMember});
    }

    async  delete(req, res) {
        const { idTeam } = req.params;
        const  deleteTeam = await _teamService.delete(idTeam);
        // console.log(deleteTeam)
        return res.status(201).send({message: deleteTeam});
    }

    async bestTeam(req, res) {
        const team = await _teamService.bestTeam();
        //    JSON.stringify(team)
        return res.json(team);
    }

    async getTeamInfo(req, res) {
        const { idUsu } = req.params;
        // console.log(idUsu)
        const team = await _teamService.getTeamInfo(idUsu);
        //    JSON.stringify(team)
        return res.json(team);
    }

    
    //obtener un equipo ganador
//   router.get('/getTeamWinner/:idTeam1/:idTeam2', TeamController.getTeamWinner);
// getTeamWinner

async getTeamWinner(req, res) {
    const { idTeam1 } = req.params;
    const { idTeam2 } = req.params;
    const heroWin = await _teamService.getTeamWinner(idTeam1,idTeam2);
    //    JSON.stringify(user)
    return res.json(heroWin);
    // return res.send(heroWin);

}


async searchTeam(req, res) {
    const {TeamName } = req.params;
    const team= await _teamService.searchTeam(TeamName);
    return res.json(team);

}



}


module.exports = TeamController;