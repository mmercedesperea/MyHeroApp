const BaseService = require('./base.service')


let _userHeroOBJ = null

class UserHeroService extends BaseService {
  constructor({ UserHero }) {
    super(UserHero)
    _userHeroOBJ = UserHero
  }

  async match(body) {
    return await _userHeroOBJ.match(body)
  }

  async followHero(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }

    // comprobamos si ya existe una relacion entre el usuario y el hero
    const matchUserHero = await this.match(body)

    

    if (!matchUserHero) {
      // insertamos al usuario con el hero
      const insertUserHero = await _userHeroOBJ.InsertUH(body)

      console.log(insertUserHero)
      if (insertUserHero) {
        return await _userHeroOBJ.followUH(body)
      }
    }

    if (matchUserHero) {
      // actualizamos el campo de follow a true
      return await _userHeroOBJ.followUH(body)
    }
  }

  async unfollowHero(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }
    // actualizamos el campo de follow a false
    return await _userHeroOBJ.unfollowUH(body)
  }

  async favorite(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }

    // comprobamos si ya existe una relacion entre el usuario y el hero
    const matchUserHero = await this.match(body)

    // console.log(matchUserHero)

    if (!matchUserHero) {
      // insertamos al usuario con el hero
      const insertUserHero = await _userHeroOBJ.InsertUH(body)

      // console.log(insertUserHero)
      if (insertUserHero) {
        return await _userHeroOBJ.favoriteUH(body)
      }
    }
    // console.log(matchUserHero)
    if (matchUserHero) {
      // actualizamos el campo de favorite a true
      return await _userHeroOBJ.favoriteUH(body)
    }
  }


  async unfavorite(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }

    // actualizamos el campo de follow a false
    return await _userHeroOBJ.unfavorite(body)

  }

  async voteHero(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }

    // comprobamos si ya existe una relacion entre el usuario y el hero
    const matchUserHero = await this.match(body)

    // console.log(matchUserHero)

    if (!matchUserHero) {
      // insertamos al usuario con el hero
      const insertUserHero = await _userHeroOBJ.InsertUH(body)

      // console.log(insertUserHero)
      if (insertUserHero) {
        return await _userHeroOBJ.voteHero(body)
      }
    }

    if (matchUserHero) {
      // actualizamos el campo de favorite a true
      return await _userHeroOBJ.voteHero(body)
    }
  }

  async commentHero(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }

    // comprobamos si ya existe una relacion entre el usuario y el hero
    const matchUserHero = await this.match(body)

    // console.log(matchUserHero)

    if (!matchUserHero) {
      // insertamos al usuario con el hero
      const insertUserHero = await _userHeroOBJ.InsertUH(body)

      // console.log(insertUserHero)
      if (insertUserHero) {
        return await _userHeroOBJ.commentHero(body)
      }
    }

    if (matchUserHero) {
      // actualizamos el campo de favorite a true
      return await _userHeroOBJ.commentHero(body)
    }
  }

  async deleteCHero(body) {
    if (!body.idUsu) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }

    if (!body.idHero) {
      const error = new Error()
      error.status = 400
      error.message = 'id hero must be sent'
      throw error
    }
    return await _userHeroOBJ.deleteCHero(body);
  }

  async getFav(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = 'id must be sent';
      throw error;
    }
    // en caso de que exista la id vamos a buscar esa entidad
    const currentEntity = await _userHeroOBJ.getFav(id);
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      // const error = new Error();
      // error.status = 400;
      // error.message = 'There is no relationship';
      // throw error;
      return null;
    }
    return currentEntity;
  }

  async getCommentHero(idUser, idHero) {
    if (!idUser) {
      const error = new Error();
      error.status = 400;
      error.message = 'idUser must be sent';
      throw error;
    }

    if (!idHero) {
      const error = new Error();
      error.status = 400;
      error.message = 'idHero must be sent';
      throw error;
    }
    // en caso de que exista la id vamos a buscar esa entidad
    const currentEntity = await _userHeroOBJ.getCommentHero(idUser, idHero);
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      return null;
    }
    return currentEntity[0];
  }

  async getVoteHero(idUser, idHero) {
    if (!idUser) {
      const error = new Error();
      error.status = 400;
      error.message = 'idUser must be sent';
      throw error;
    }

    if (!idHero) {
      const error = new Error();
      error.status = 400;
      error.message = 'idHero must be sent';
      throw error;
    }
    // en caso de que exista la id vamos a buscar esa entidad
    const currentEntity = await _userHeroOBJ.getVoteHero(idUser, idHero);
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      return null;
    }
    return currentEntity[0];
  }

  async bestMarverHero() {
    const currentEntity = await _userHeroOBJ.bestMarverHero();
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      const error = new Error();
      error.status = 400;
      error.message = 'There is no hero from marvel';
      throw error;
    }
    return currentEntity;
  }

  async bestDCHero() {
    const currentEntity = await _userHeroOBJ.bestDCHero();
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      const error = new Error();
      error.status = 400;
      error.message = 'There is no hero from DC';
      throw error;
    }
    return currentEntity;
  }

  async  mostFollowHeros() {
    const currentEntity = await _userHeroOBJ.mostFollowHeros();
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      const error = new Error();
      error.status = 400;
      error.message = 'There is no heros';
      throw error;
    }
    return currentEntity;
  }


  async getHeroUsu(idUser, idHero) {
    if (!idUser) {
      const error = new Error();
      error.status = 400;
      error.message = 'idUser must be sent';
      throw error;
    }

    if (!idHero) {
      const error = new Error();
      error.status = 400;
      error.message = 'idHero must be sent';
      throw error;
    }
    // en caso de que exista la id vamos a buscar esa entidad
    const currentEntity = await _userHeroOBJ.getHeroUsu(idUser, idHero);
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      return null;
    }
    return currentEntity[0];
  }


  async  getHeroComments(idHero ) {
    if (!idHero ) {
      const error = new Error();
      error.status = 400;
      error.message = 'idHero must be sent';
      throw error;
    }

    // en caso de que exista la id vamos a buscar esa entidad
    const currentEntity = await _userHeroOBJ.getHeroComments(idHero);
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      return null;
    }
    return currentEntity;
  }


  // async modifyCHero(body) {
  //   if (!body.idUsu) {
  //     const error = new Error()
  //     error.status = 400
  //     error.message = 'id must be sent'
  //     throw error
  //   }

  //   if (!body.idHero) {
  //     const error = new Error()
  //     error.status = 400
  //     error.message = 'id hero must be sent'
  //     throw error
  //   }
  //   return await _userHeroOBJ.modifyCHero(body);
  // }

}

module.exports = UserHeroService
