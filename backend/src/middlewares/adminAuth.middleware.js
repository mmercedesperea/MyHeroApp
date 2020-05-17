// clase para comprobar si es administrador

exports.isAdmin= function(req,res,next){
    if(req.user.admin !=0){
        return res.stattus(200).send({message: 'You are not admin'})
    }
    next();
}