
const container = require('./src/startup/container');
const server = container.resolve('server');
const DB = container.resolve('DB');

function conexion() {
    server.start()
        .catch(console.log)
    DB.conexion()
        .catch(console.log)

}

conexion();

