let _db = null

const mysql = require('mysql');

class DBConexion {
    constructor() {
        // pruebabd: ""

    }

    async conexion(req, res) {

        const mysqlConnection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '',
            database: 'myheroapp'

        });
        // function DBStart() {
        mysqlConnection
            .connect((err) => {
                if (err) throw err;
                console.log("DB is connected");

                // }
            });

        _db = mysqlConnection
        // global.mysqlConnection = mysqlConnection;
    }

    // obtener elemento
    async consulta(sql) {
        return new Promise((resolve, reject) => {
            _db.query(sql,
                (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        reject("NO se ha podido obtener" + err);
                    }
                    else if (rows.length > 0) {
                        resolve(rows);
                    }
                    else { resolve(null) }

                });
        });
    }
    // crear
    async create(sql) {
        return new Promise((resolve, reject) => {
            console.log(sql)
            _db.query(sql,
                (err) => {
                    if (err) {
                        console.log(err);
                        reject("NO se ha podido crear" + err);
                    } else {
                        resolve("Elemento creado");
                    }
                })
        })
    }

    async createNewHero(sql,entity) {
        return new Promise((resolve, reject) => {
            console.log(sql)
            _db.query(sql,[entity.idHero,entity.heroName,entity.image,entity.intelligence,entity.strength,entity.speed,entity.durability,entity.power,entity.combat,entity.fullName,entity.placeOfBirth,entity.publisher,entity.alignment,entity.firstApperance,entity.gender,entity.race,entity.height,entity.weight,entity.work],
                (err) => {
                    if (err) {
                        console.log(err);
                        reject("NO se ha podido crear" + err);
                    } else {
                        resolve("Elemento creado");
                    }
                })
        })
    }
    

    async update(sql) {
        return new Promise((resolve, reject) => {
            console.log(sql)
            _db.query(sql,
                (err) => {
                    if (err) {
                        console.log(err);
                        reject("NO se ha podido actualizar" + err);
                    } else {
                        resolve("Elemento actualizado");
                    }
                    // _row = rows
                    // console.log(rows)
                })
            // resolve(console.log("Elemento actualizado"));
        })
    }

    async create(sql) {
        return new Promise((resolve, reject) => {
            console.log(sql)
            _db.query(sql,
                (err) => {
                    if (err) {
                        console.log(err);
                        reject("NO se ha podido crear" + err);
                    } else {
                        resolve("Elemento creado");
                    }
                })
        })
    }

    async delete(sql) {
        return new Promise((resolve, reject) => {
            console.log(sql)
            _db.query(sql,
                (err) => {
                    if (err) {
                        console.log(err);
                        reject("NO se ha podido eliminar" + err);
                    } else {
                        resolve("Elemento eliminado");
                    }
                })
        })
    }

    //true false
    // async match(sql) {
    //     return new Promise((resolve, reject) => {
    //         _db.query(sql,
    //             (err, rows, fields) => {
    //                 if (err) {
    //                     console.log(err);
    //                     reject("NO se ha podido obtener" + err);
    //                 }
    //                 else if (rows.length > 0) {
    //                     resolve(true);
    //                 }
    //                 else { resolve(false) }

    //             });
    //     });

    // }

    // global.mysqlConnection = mysqlConnection;
    // async dbData(sql) {

    //     const resultado= await _db.query(sql, (err, rows) => {
    //         if (err) console.log(err);
    //         // console.log(rows)
    //         // res.json(rows)
    //         return JSON.stringify(rows);

    //     });

    //     console.log(resultado);

    // }
    // }


}

// console.log(mysqlConnection)

module.exports = DBConexion;


// global.db = db;


