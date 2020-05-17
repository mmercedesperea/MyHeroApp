const { Router } = require('express');

// para asegurarnos de que el usuario este autentificado para acceder a ciertas rutas
const { AuthMiddleware,AdminAuth, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');


module.exports = function ({ TeamController }) {

    const router = Router();

    // Create a team
    router.post('/createTeam',[AuthMiddleware], TeamController.createTeam);

    //change name
    router.put('/chageName/:idTeam',[AuthMiddleware], TeamController.chageName);

    //añadir nuevo miembro (hay que mandarle el campo de la bd "member_1, member_2, etc" y el codigo del hero)
    router.put('/addMember/:idTeam',[AuthMiddleware], TeamController.addMember);

    //delete member
    router.put('/deleteMember/:idTeam',[AuthMiddleware], TeamController.deleteMember);

    // check the numbers of menbers
    // router.get('/checkTeam/:idTeam', TeamController.checkTeam);

    // obtener equipo por id
    // router.get('/getTeam/:idTeam', TeamController.getTeam);

    // obtener equipo de usuario
    // router.get('/getTeam/usu/:idUsu', TeamController.getTeamUsu);

    // borrar un equipo
    router.delete('/:idTeam',[AuthMiddleware], TeamController.delete);

    // obtener equipo con mayor stats
    router.get('/bestTeam', TeamController.bestTeam);

    // obtener info basica equipo de usuario 
    router.get('/getTeamInfo/:idUsu', TeamController.getTeamInfo);

    return router;
}

