// clase para comprobar si es administrador
// module.exports = function (req, res, next) {

exports.isAdmin= function(req,res,next){
    console.log(req.user.admin)
    if(req.user.admin !=1){
        return res.status(200).send({message: 'You are not admin'})
    }
    next();
}