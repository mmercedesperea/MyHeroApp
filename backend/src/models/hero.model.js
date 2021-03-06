let table = null
let _DB = null
const apiKey = '105139264478917'
const host = `https://www.superheroapi.com/api/${apiKey}/`

var rp = require('request-promise')

/**
 * hero class
 */
class Hero {
  /**
   *
   * @param {class} DB insert our db connection class
   */
  constructor({ DB }) {
    this.idHero = 0
    this.heroName = ''
    this.image = ''
    this.intelligence = ''
    this.strength = ''
    this.speed = ''
    this.durability = ''
    this.power = ''
    this.combat = ''
    this.fullName = ''
    this.placeOfBirth = ''
    this.publisher = ''
    this.alignment = ''
    this.firstApperance = ''
    this.gender = ''
    this.race = ''
    this.height = ''
    this.weight = ''
    this.eyeColor = ''
    this.hairColor = ';'
    this.work = ''
    this.biography = ''
    this.createDate = Date
    table = 'heroes'
    _DB = DB
  }

  /**
   * Get a hero by id
   * @param {number} idTeam
   * @return {object} if the function is successful it will return one element from the DB, if not will be returned indicating that there has been a failure
   */
  async get(idHero) {
    if (idHero == 'null') {
      return await null
    }
    var _Hero = await _DB.consulta(
      `SELECT * from ${table} WHERE idHero =${idHero}`
    )
    if (_Hero != null) {
      return _Hero[0]
    } else {
      _Hero = await this.getHeroByid(idHero)
      return _Hero
    }
  }
  /**
   * Get the winner hero
   * @param {number} idHero
   * @param {number} idHero2
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getWinner(idHero, idHero2) {
    var Hero1 = await _DB.consulta(
      `SELECT SUM (intelligence + strength + speed +durability +power +combat) as totalPoints,idHero,heroName,image from ${table} WHERE idHero =${idHero}`
    )
    var Hero2 = await _DB.consulta(
      `SELECT SUM (intelligence + strength + speed +durability +power +combat) as totalPoints,idHero,heroName,image from ${table} WHERE idHero =${idHero2}`
    )
    if (Hero1[0].totalPoints > Hero2[0].totalPoints) {
      return Hero1[0]
    } else {
      return Hero2[0]
    }
  }

  /**
   * Get the most intelligent hero
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async mostIntelligence() {
    return await _DB.consulta(
      `select idHero, heroName, image,  intelligence from heroes ORDER by intelligence DESC LIMIT 1`
    )
  }

  /**
   * Get the strongest hero
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async mostStrength() {
    return await _DB.consulta(
      `select idHero, heroName, image, strength from heroes ORDER by strength DESC LIMIT 1`
    )
  }

  /**
   * Get the fastest hero
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async mostSpeed() {
    return await _DB.consulta(
      `select idHero, heroName, image, speed from heroes ORDER by speed DESC LIMIT 1`
    )
  }

  /**
   * Get the hero with most durability
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async mostDurability() {
    return await _DB.consulta(
      `select idHero, heroName, image, durability from heroes ORDER by durability DESC LIMIT 1`
    )
  }

  /**
   * Get the most powerful hero
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async mostPower() {
    return await _DB.consulta(
      `select idHero, heroName, image, power from heroes ORDER by power DESC LIMIT 1`
    )
  }

  /**
   * Get the hero with highest combat stats
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async mostCombat() {
    return await _DB.consulta(
      `select idHero, heroName, image, combat from heroes ORDER by combat DESC LIMIT 1`
    )
  }

  /**
   * Get new heroes in db
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async newHeros() {
    return await _DB.consulta(
      `select idHero, heroName, image, createDate  FROM heroes ORDER by createDate DESC limit 12`
    )
  }

  /**
   * Get all marvel heroes in db
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async allMarvelHeroes() {
    return await _DB.consulta(
      `select idHero, heroName, image FROM heroes WHERE publisher ='Marvel Comics'`
    )
  }

  /**
   * Get all DC heroes in db
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async allDCHeroes() {
    return await _DB.consulta(
      `select idHero, heroName, image FROM heroes WHERE publisher ='DC Comics'`
    )
  }

  /**
   * Get select img from heroes for user profile
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async profileImgHeroes() {
    return await _DB.consulta(
      `select image from heroes where idHero IN( 30,63,70,107,149,165,201,213,275,280,370,530,620)`
    )
  }

  /**
   * get heroes by name from api
   * @param {string} name
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getHeroByName(name) {
    const url = `${host}search/${name}`
    const heroes = new Array()
    return await rp(url, { json: true })
      .then(function (res) {
        if (res.error) {
          console.log(res.error)
          return res.error
        } else {
          res.results.forEach(her => {
            var hero3 = {}
            hero3.heroName = her.name
            hero3.idHero = her.id
            hero3.image = her.image.url
            heroes.push(hero3)
          })
          // we return the elements array
          return heroes
        }
      })
      .catch(function (err) {
        console.log(err)
        return err
      })
  }

  // we create a new hero identity
  // async insertHero(entity) {
  //     return await _DB.create(
  //         `INSERT INTO heroes ( idHero, heroName,image,intelligence,strength,speed,durability,power,combat,fullName,placeOfBirth,publisher,alignment,firstAppearance,gender,race,height,weight,work) VALUES ('${entity.idHero}',"${entity.heroName}","${entity.image}",${entity.intelligence},${entity.strength},${entity.speed},${entity.durability},${entity.power},${entity.combat},"${entity.fullName}","${entity.placeOfBirth}","${entity.publisher}","${entity.alignment}","${entity.firstApperance}","${entity.gender}","${entity.race}",'${entity.height}','${entity.weight}',"${entity.work}")`
  //     );
  // }

  /**
   * insert a new hero in db
   * @param {object} entity body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async insertHero(entity) {
    return await _DB.createNewHero(
      'INSERT INTO heroes ( idHero, heroName,image,intelligence,strength,speed,durability,power,combat,fullName,placeOfBirth,publisher,alignment,firstAppearance,gender,race,height,weight,eyeColor,hairColor,work) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      entity
    )
  }

  /**
   * create new hero
   * @param {object} entity body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async newHero(entity) {
    return await _DB.create(
      `INSERT INTO heroes ( heroName,image,intelligence,strength,speed,durability,power,combat,fullName,placeOfBirth,publisher,alignment,firstAppearance,gender,race,height,weight,eyeColor,hairColor,work,biography) VALUES ("${entity.heroName}","${entity.image}",${entity.intelligence},${entity.strength},${entity.speed},${entity.durability},${entity.power},${entity.combat},"${entity.fullName}","${entity.placeOfBirth}","${entity.publisher}","${entity.alignment}","${entity.firstApperance}","${entity.gender}","${entity.race}",'${entity.height}','${entity.weight}',"${entity.eyeColor}","${entity.hairColor}","${entity.work}","${entity.biography}")`
    )
  }

  /**
   * update hero info
   * @param {number} idHero
   * @param {object} entity  body of the element that brings the path
   * @return {*} if the function has been successful, a resolve will be returned indicating that it could be created, otherwise will be returned indicating the opposite
   */
  async modifyHero(idHero, entity) {
    return await _DB.update(
      `UPDATE ${table}  SET heroName = '${entity.heroName}', image = '${entity.image}', intelligence = ${entity.intelligence}, strength =${entity.strength}, speed =${entity.speed},durability =${entity.durability},power =${entity.power},combat =${entity.combat},fullName='${entity.fullName}',placeOfBirth='${entity.placeOfBirth}',publisher='${entity.publisher}',alignment='${entity.alignment}',firstAppearance='${entity.firstAppearance}',gender='${entity.gender}',race='${entity.race}',height='${entity.height}',weight='${entity.weight}',work='${entity.work}',eyeColor='${entity.eyeColor}' ,hairColor='${entity.hairColor}' ,biography='${entity.biography}' WHERE idHero = ${idHero}`
    )
  }

  /**
   * Get hero by id from api
   * @param {number} id
   * @return {object} if the function is successful it will return one elements from the DB, if not will be returned indicating that there has been a failure
   */
  async getHeroByid(id) {
    const url = `${host}${id}`

    var newHeroGet = await rp(url, { json: true })
      .then(function (res) {
        let NewHeroCreate = Hero
        console.log(res.appearance['hair-color'])
        NewHeroCreate.idHero = res.id
        NewHeroCreate.heroName = res.name
        NewHeroCreate.image = res.image.url
        NewHeroCreate.intelligence =
          res.powerstats.intelligence === 'null'
            ? 40
            : res.powerstats.intelligence
        NewHeroCreate.strength =
          res.powerstats.strength === 'null' ? 40 : res.powerstats.strength
        NewHeroCreate.speed =
          res.powerstats.speed === 'null' ? 40 : res.powerstats.speed
        NewHeroCreate.durability =
          res.powerstats.durability === 'null' ? 40 : res.powerstats.durability
        NewHeroCreate.power =
          res.powerstats.power === 'null' ? 40 : res.powerstats.power
        NewHeroCreate.combat =
          res.powerstats.combat === 'null' ? 40 : res.powerstats.combat
        NewHeroCreate.fullName =
          res.biography['full-name'] === ''
            ? 'unknown'
            : res.biography['full-name']
        NewHeroCreate.placeOfBirth =
          res.biography['place-of-birth'] === '-'
            ? 'unknown'
            : res.biography['place-of-birth']
        NewHeroCreate.publisher = res.biography.publisher
        NewHeroCreate.alignment = res.biography.alignment
        NewHeroCreate.firstApperance =
          res.biography['first-appearance'] === '-'
            ? 'unknown'
            : res.biography['first-appearance']
        NewHeroCreate.gender = res.appearance.gender
        NewHeroCreate.race = res.appearance.race
        NewHeroCreate.height = res.appearance.height[1]
        NewHeroCreate.weight = res.appearance.weight[1]
        NewHeroCreate.eyeColor = res.appearance['eye-color']
        NewHeroCreate.hairColor =
          res.appearance === 'null' ? 'unknown' : res.appearance['hair-color']
        NewHeroCreate.work =
          res.work.occupation === '-' ? 'unknown' : res.work.occupation
        return NewHeroCreate
      })
      .catch(function (err) {
        console.log(err)
        return err
      })
    // insert in the db
    await this.insertHero(newHeroGet)
    // return the element
    return this.get(newHeroGet.idHero)
  }

  /**
   * search all heroes in api
   */
  async searchAllHeroes() {
    for (var i = 700; i < 800; i++) {
      this.getHeroByid(i)
    }
  }

  /**
   * get heroes by name from db
   * @param {string} name
   * @return {array} if the function is successful it will return one or more elements from the DB, if not will be returned indicating that there has been a failure
   */
  async searchHeroByName(name) {
    return await _DB.consulta(`SELECT heroName, idHero,image from heroes where heroName LIKE '${name}%' 
        `)
  }
}

module.exports = Hero
