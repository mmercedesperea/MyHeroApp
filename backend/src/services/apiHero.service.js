_HeroObj = null;

// var hero = new Hero();

class ApiHeroService{
    constructor({Hero}){
        _HeroObj= Hero;
    }

async get(name){

    if(!name){
        const error = new Error();
        error.status = 400;
        error.message = 'Name must be sent';
        throw error;
    }
    // console.log('LLego al servicio'+ name);
    

    return await _HeroObj.getHeroByName(name);


}


async getHeroByid(id){

    if(!id){
        const error = new Error();
        error.status = 400;
        error.message = 'Id must be sent';
        throw error;
    }
    // console.log('LLego al servicio'+ name);
    
    // return await { hero": _HeroObj.getHeroByid(id)}
    return await _HeroObj.getHeroByid(id);


}



}

module.exports = ApiHeroService;