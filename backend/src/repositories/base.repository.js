let _DB = null

class BaseRepository {
    constructor(DB, table) {
        // _DB = DB;
        this.DB = DB;
        this.table = table;

    }


    //obtener una entidad por id
    async get(id) {
        // console.log(this.table)
        // console.log('LA ID ESSS' + id)
        return await this.DB.consulta(`SELECT * from ${this.table} WHERE idUsu =${id}`)
        // return await this.DB.consulta(this.table, id);

    }

    // crear unna nueva entidad
    // async create(entity) {
    //     console.log(entity)
    //     console.log(entity.email)
    //     return await this.DB.create(`INSERT INTO ${this.table} ( email, password) VALUES ('${entity.email}', '${entity.password}')`);
    // }
}

module.exports = BaseRepository
