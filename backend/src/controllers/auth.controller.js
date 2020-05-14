let _authService = null;

class AuthController {
    constructor({AuthService}){
        _authService = AuthService;
    }

    async signUp(req,res){
        const{ body } = req;
        const createUser = await _authService.signUp(body);
        console.log(createUser);
        return res.status(201).send({message:createUser});
    }

    async signIn(req,res){
        const { body }= req;
        const creds = await _authService.signIn(body);
        // return res.send(creds);
        return res.json(creds);

    }



}

module.exports = AuthController;