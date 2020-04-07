const BaseRepository = require('./base.repository');
// let _user = null;
let table = null;
let _DB = null

class UserRepository extends BaseRepository {
    constructor({ DB }) {
        table = "users"
        _DB=DB
        super(DB, table)
        // super(table);


        // _table = "users";
    }

    // decimos que busque a un usuario mediante su email
    async getUserByemail(email){
        return await _DB.consulta(`SELECT * FROM ${table} WHERE email = '${email}'`);
    }


      // crear unna nueva entidad
      async create(entity) {
        console.log(entity)
        console.log(entity.email)
        return await _DB.create(`INSERT INTO ${table} ( email, password) VALUES ('${entity.email}', '${entity.password}')`);
    }







}

module.exports = UserRepository;