
let _adminService = null;

class AdminController{
    constructor({AdminService}){
        _adminService= AdminService;
    }

    async  newHero(req, res) {
        const { body } = req;
        const  newHero = await _adminService.newHero(body);
        // console.log(newHero)
        return res.status(201).send({message: newHero});
    }

    async allUsers(req, res) {
        const allUsers = await _adminService.allUsers();
        //    JSON.stringify(team)
        return res.json(allUsers);
    }

    async  modifyHero(req, res) {
        const { idHero } = req.params;
        const { body } = req;
        const  modifyHero = await _adminService.modifyHero(idHero,body);
        console.log(modifyHero)
        return res.status(201).send({message:modifyHero});
    }

    async  deleteUser(req, res) {
        const { idUsu } = req.params;
        console.log(idUsu)
        const  deleteUser = await _adminService.deleteUser(idUsu);
        // console.log(deleteUser)
        return res.status(201).send({message: deleteUser});
    }
}

module.exports = AdminController;

//   // Create new hero
//   router.post('/newHero',[AuthMiddleware,AdminAuth], AdminController.newHero);

//   //modify hero
//   router.put('/modifyHero/:idHero',[AuthMiddleware,,AdminAuth], AdminController.modifyHero);

//   // Delete user
//   router.delete('/:idTeam',[AuthMiddleware,,AdminAuth],  AdminController.delete);

//   // get all users
//   router.get('/allUsers',[AuthMiddleware,,AdminAuth],  AdminController.bestTeam);
