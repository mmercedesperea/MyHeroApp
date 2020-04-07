// Para los tokens de autentificacion
const { sign } = require ('jsonwebtoken');
// para traer el secrest de nuestro token
const {JWT_SECRET} = require ('../config');


// metodo para devolver el token 
module.exports.generateToken = function(user){
    // creamos el token de autentificacion codificando el objeto usuario con nuestra contraseña secreta y le damos un tiempo de expiracion de 4h
    return sign({ user }, JWT_SECRET, { expiresIn:'4h'});
};