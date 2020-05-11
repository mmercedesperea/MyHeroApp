const { Router } = require('express');

// para asegurarnos de que el usuario este autentificado para acceder a ciertas rutas
const { AuthMiddleware, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');

module.exports = function ({ UserController }) {
  const router = Router();
  //     // para la subida de archivos
  // var multipart = require('connect-multiparty');
  // var md_upload= multipart({ uploadDIr:'./uploads/users'});

  //obtener un usuario
  router.get('/:idUsu', UserController.get);

  //actualizar un usuario
  router.put('/:idUsu', UserController.update);

  //actualizar contraseña
  router.put('/newpass/:idUsu', UserController.updatePass);

  // Eliminar informacion de usuario de la bd
  router.post('/deleteUser/:idUsu', UserController.delete);

  // Follow a user
  router.post('/followUser', UserController.followUser);

  // unfollow a user
  router.delete('/unFollowUser/:idUsu/:idUnfollow', UserController.unFollowUser);

  //Buscar un usuario por nombre
  router.get('/getUserByName/:userName', UserController.getUserByName);

  // router.post('/uploadImg/:idUsu',[md_upload],UserController.uploadImage);

// comprobar si se sigue
  router.get('/checkFollow/:idUsu/:idUnfollow', UserController.checkFollow);

// obtener todos los usuarios que sigues
  router.get('/getFollowUsers/:idUsu', UserController.getFollowUsers);

  // obtener todos los usuarios que te siguen
  router.get('/getFollowersUsers/:idUsu', UserController.getFollowersUsers);

  return router;
};