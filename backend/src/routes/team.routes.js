const { Router } = require('express');

module.exports = function ({ TeamController }) {

    const router = Router();

    // Create a team
    router.post('/createTeam', TeamController.createTeam);

    //change name
    router.put('/chageName/:idTeam', TeamController.chageName);

    //añadir nuevo miembro (hay que mandarle el campo de la bd "member_1, member_2, etc" y el codigo del hero)
    router.put('/addMember/:idTeam', TeamController.addMember);

    //delete member
    router.put('/deleteMember/:idTeam', TeamController.deleteMember);

    // check the numbers of menbers
    router.get('/checkTeam/:idTeam', TeamController.checkTeam);

    // obtener equipo por id
    router.get('/getTeam/:idTeam', TeamController.getTeam);

    // obtener equipo de usuario
    router.get('/getTeam/usu/:idUsu', TeamController.getTeamUsu);

    // borrar un equipo
    router.delete('/:idTeam', TeamController.delete);

    // obtener equipo con mayor stats
    router.get('/bestTeam', TeamController.bestTeam);

    return router;
}

