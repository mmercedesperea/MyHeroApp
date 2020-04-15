const { Router } = require('express');

module.exports = function ({ TeamController }) {

    const router = Router();

    
    router.post('/createTeam', TeamController.createTeam);

    router.put('/addMenber/:idTeam', TeamController.addMenber);

    router.put('/deleteMenber/:idTeam/:idMenber', TeamController.deleteMenber);

    // check the numbers of menbers
    router.get('/checkTeam/:idTeam', TeamController.checkTeam);

    router.get('/:idTeam', TeamController.getTeam);



    return router;
}

