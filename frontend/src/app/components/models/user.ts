export class User{
    constructor(
        public idUsu? : number,
        public email? : string,
        public password? : string,
        public name? : string,
        public alias? : string,
        public surname? : string,
        public dateOfBirth? : Date,
        public photo? : string,
        public admin? : number,
    ){}
}
