
const container = require('./src/startup/container');
const server = container.resolve('server');
const DB = container.resolve('DB');

/**
 * Function to start the server and conection with the DB
 * @return {void}
 */
function conexion() {
    server.start()
        .catch(console.log)
    DB.conexion()
        .catch(console.log)

}

conexion();

