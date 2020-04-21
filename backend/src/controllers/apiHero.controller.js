let _apiHeroService = null;

class ApiHeroController{
constructor({ApiHeroService}){
    _apiHeroService = ApiHeroService;
}


    async get(req, res) {
        const { name } = req.params;
        const hero = await _apiHeroService.get(name);
        //    JSON.stringify(user)
        console.log('llego aqui'+ name)
        return res.send(hero);
    }

    async getHeroByid(req, res) {
        const { id } = req.params;
        const hero = await _apiHeroService.getHeroByid(id);
        //    JSON.stringify(user)
        // console.log('llego aqui'+ id)
        console.log(hero);
        
        return res.send(hero);
    }


}

module.exports = ApiHeroController;