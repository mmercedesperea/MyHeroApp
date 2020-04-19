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

    // obtener equipo
    router.get('/:idTeam', TeamController.getTeam);

    // borrar un equipo
    router.delete('/:idTeam', TeamController.delete);

    return router;
}

