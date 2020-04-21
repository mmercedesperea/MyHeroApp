const BaseService = require('./base.service')

let _userHeroRepository = null
let _userHeroOBJ = null

class UserHeroService extends BaseService {
  constructor({ UserHeroRepository, UserHero }) {
    super(UserHeroRepository)
    _userHeroRepository = UserHeroRepository
    _userHeroOBJ = UserHero
  }

  async match(body) {
    return await _userHeroRepository.match(body)
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

    console.log(matchUserHero)

    if (!matchUserHero) {
      // insertamos al usuario con el hero
      const insertUserHero = await _userHeroRepository.InsertUH(body)

      console.log(insertUserHero)
      if (insertUserHero) {
        return await _userHeroRepository.followUH(body)
      }
    }

    if (matchUserHero) {
      // actualizamos el campo de follow a true
      return await _userHeroRepository.followUH(body)
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
    return await _userHeroRepository.unfollowUH(body)
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

    console.log(matchUserHero)

    if (!matchUserHero) {
      // insertamos al usuario con el hero
      const insertUserHero = await _userHeroRepository.InsertUH(body)

      console.log(insertUserHero)
      if (insertUserHero) {
        return await _userHeroRepository.favorite(body)
      }
    }

    if (matchUserHero) {
      // actualizamos el campo de favorite a true
      return await _userHeroRepository.favorite(body)
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
    return await _userHeroRepository.unfavorite(body)

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

    console.log(matchUserHero)

    if (!matchUserHero) {
      // insertamos al usuario con el hero
      const insertUserHero = await _userHeroRepository.InsertUH(body)

      console.log(insertUserHero)
      if (insertUserHero) {
        return await _userHeroRepository.voteHero(body)
      }
    }

    if (matchUserHero) {
      // actualizamos el campo de favorite a true
      return await _userHeroRepository.voteHero(body)
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

    console.log(matchUserHero)

    if (!matchUserHero) {
      // insertamos al usuario con el hero
      const insertUserHero = await _userHeroRepository.InsertUH(body)

      console.log(insertUserHero)
      if (insertUserHero) {
        return await _userHeroRepository.commentHero(body)
      }
    }

    if (matchUserHero) {
      // actualizamos el campo de favorite a true
      return await _userHeroRepository.commentHero(body)
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
    return await _userHeroRepository.deleteCHero(body);
  }

  async getFav(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = 'id must be sent';
      throw error;
    }
    // en caso de que exista la id vamos a buscar esa entidad
    const currentEntity = await _userHeroRepository.getFav(id);
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      const error = new Error();
      error.status = 400;
      error.message = 'There is no relationship';
      throw error;
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
    const currentEntity = await _userHeroRepository.getCommentHero(idUser, idHero);
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      const error = new Error();
      error.status = 400;
      error.message = 'There is no relationship';
      throw error;
    }
    return currentEntity;
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
    const currentEntity = await _userHeroRepository.getVoteHero(idUser, idHero);
    // JSON.stringify(currentEntity);
    // console.log(currentEntity)
    if (!currentEntity) {
      const error = new Error();
      error.status = 400;
      error.message = 'There is no relationship';
      throw error;
    }
    return currentEntity;
  }

  async bestMarverHero() {
    const currentEntity = await _userHeroRepository.bestMarverHero();
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
    const currentEntity = await _userHeroRepository.bestDCHero();
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
    const currentEntity = await _userHeroRepository.mostFollowHeros();
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

}

module.exports = UserHeroService
