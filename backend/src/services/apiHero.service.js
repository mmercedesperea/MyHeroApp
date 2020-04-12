_ApiHeroRepository = null;

// var hero = new Hero();

class ApiHeroService{
    constructor({ApiHeroRepository}){
        _ApiHeroRepository= ApiHeroRepository;
    }

async get(name){

    if(!name){
        const error = new Error();
        error.status = 400;
        error.message = 'Name must be sent';
        throw error;
    }
    // console.log('LLego al servicio'+ name);
    

    return await _ApiHeroRepository.getHeroByName(name);


}


async getHeroByid(id){

    if(!id){
        const error = new Error();
        error.status = 400;
        error.message = 'Id must be sent';
        throw error;
    }
    // console.log('LLego al servicio'+ name);
    

    return await _ApiHeroRepository.getHeroByid(id);


}



}

module.exports = ApiHeroService;