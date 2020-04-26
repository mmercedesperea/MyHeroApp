// export interface User{
   
//          idUsu? : number,
//          email? : string,
//          password? : string,
//          name? : string,
//          alias? : string,
//         surname? : string,
//         dateOfBirth? : Date,
//         photo? : string,
//         admin? : number,
//         exp?: number

// }


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
        public exp?: number
    ){}
}




