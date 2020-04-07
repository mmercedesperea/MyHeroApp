// Para los tokens de autentificacion
const { sign } = require ('jsonwebtoken');
// para traer el secrest de nuestro token
const {JWT_SECRET} = require ('../config');


// metodo para devolver el token 
module.exports.generateToken = function(user){
    return sign({ user }, JWT_SECRET, { expiresIn:'4h'});
};