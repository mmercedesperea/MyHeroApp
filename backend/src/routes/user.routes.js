const { Router } = require('express');

// para asegurarnos de que el usuario este autentificado para acceder a ciertas rutas
const { AuthMiddleware,AdminAuth, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');

module.exports = function ({ UserController }) {
  const router = Router();
  //     // para la subida de archivos
  // var multipart = require('connect-multiparty');
  // var md_upload= multipart({ uploadDIr:'./uploads/users'});

  //obtener un usuario
  router.get('/:idUsu', UserController.get);

  //update a user
  router.put('/:idUsu',[AuthMiddleware], UserController.update);

  //user new pass
  router.put('/newpass/:idUsu',[AuthMiddleware], UserController.updatePass);

  // Eliminar informacion de usuario de la bd
  router.post('/deleteUser/:idUsu',[AuthMiddleware], UserController.delete);

  // Follow a user
  router.post('/followUser',[AuthMiddleware], UserController.followUser);

  // unfollow a user
  router.delete('/unFollowUser/:idUsu/:idUnfollow',[AuthMiddleware], UserController.unFollowUser);

  //Buscar un usuario por nombre
  router.get('/getUserByName/:userName', UserController.getUserByName);

  // router.post('/uploadImg/:idUsu',[md_upload],UserController.uploadImage);

// check whether a user is being followed
  router.get('/checkFollow/:idUsu/:idUnfollow',UserController.checkFollow);

// get all the users you follow
  router.get('/getFollowUsers/:idUsu', UserController.getFollowUsers);

  // get all the users who follow you
  router.get('/getFollowersUsers/:idUsu', UserController.getFollowersUsers);

  //actualizar img
  router.put('/newImg/user',[AuthMiddleware], UserController.newImg);
  

  return router;
};