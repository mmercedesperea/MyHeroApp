let _db = null

const mysql = require('mysql')

/**
 * DB conexion
 */
class DBConexion {
  /**
   * @constructor
   */
  constructor () {}

  /**
   * Function to try the DB conexion
   */
  async conexion () {
    /**
     *  we specify our DB conexion data
     */
    const mysqlConnection = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'myheroapp'
    })
    /**
     * Connection with mysqlConnection if error show error else db is conected
     */

    mysqlConnection.connect(err => {
      if (err) throw err
      console.log('DB is connected')
    })

    /**
     * _db contain the conexion to the DB
     */
    _db = mysqlConnection
  }

  /**
   * function to make a query to the DB that will return one or more elements
   * @param {String} sql  the sql query to the db
   * @return {Promise} if the query is successful it will return one or more elements from the DB, if not a reject will be returned indicating that there has been a failure
   */
  async consulta (sql) {
    return new Promise((resolve, reject) => {
      _db.query(sql, (err, rows, fields) => {
        // console.log(sql)
        if (err) {
          console.log(err)
          reject('Could NOT be obtained' + err)
        } else if (rows.length > 0) {
          resolve(rows)
        } else {
          resolve(null)
        }
      })
    })
  }

  /**
   * function to create a new element in the DB
   * @param {String} sql  the sql query to the db
   * @return {Promise} if the query has been successful, a resolve will be returned indicating that it could be created, otherwise a reject will be returned indicating the opposite
   */

  async create (sql) {
    return new Promise((resolve, reject) => {
      _db.query(sql, err => {
        if (err) {
          console.log(err)
          reject('Could NOT create' + err)
        } else {
          resolve('Item has been created')
        }
      })
    })
  }

  /**
   * function to create a new Hero in the DB
   * @param {*} sql  the sql query to the db
   * @param {*} entity  Entity that contains the information you want to send in the query
   * @return {Promise} if the query has been successful, a resolve will be returned indicating that it could be created, otherwise a reject will be returned indicating the opposite
   */
  async createNewHero (sql, entity) {
    return new Promise((resolve, reject) => {
      console.log(sql)
      _db.query(
        sql,
        [
          entity.idHero,
          entity.heroName,
          entity.image,
          entity.intelligence,
          entity.strength,
          entity.speed,
          entity.durability,
          entity.power,
          entity.combat,
          entity.fullName,
          entity.placeOfBirth,
          entity.publisher,
          entity.alignment,
          entity.firstApperance,
          entity.gender,
          entity.race,
          entity.height,
          entity.weight,
          entity.eyeColor,
          entity.hairColor,
          entity.work
        ],
        err => {
          if (err) {
            console.log(err)
            reject('Could NOT create' + err)
          } else {
            resolve('Item has been created')
          }
        }
      )
    })
  }

  /**
   * function to update a element in the DB
   * @param {String} sql  the sql query to the db
   * @return {Promise} if the query has been successful, a resolve will be returned indicating that it could be update, otherwise a reject will be returned indicating the opposite
   */

  async update (sql) {
    return new Promise((resolve, reject) => {
      console.log(sql)
      _db.query(sql, err => {
        if (err) {
          console.log(err)
          reject('Could not update' + err)
        } else {
          resolve('Updated item')
        }
      })
    })
  }

  /**
   * Function to delete a element in the DB
   * @param {String} sql  the sql query to the db
   * @return {Promise} if the query has been successful, a resolve will be returned indicating that it could be delete, otherwise a reject will be returned indicating the opposite
   */
  async delete (sql) {
    return new Promise((resolve, reject) => {
      _db.query(sql, err => {
        if (err) {
          console.log(err)
          reject('Could NOT be removed' + err)
        } else {
          resolve('Deleted item')
        }
      })
    })
  }
}

module.exports = DBConexion
