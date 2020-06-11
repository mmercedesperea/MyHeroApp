/**
 * User class
 * User class to work with it
 */
export class User {

    /**
    * Constructor
    */
    constructor(
        /**
         * User's identifier
         */
        public idUsu?: number,
        /**
        * User's email
        */
        public email?: string,
        /**
        * User's password
        */
        public password?: string,
        /**
        * User's name
        */
        public userName?: string,
        /**
        * User's alias
        */
        public alias?: string,
        /**
        * User's surname
        */
        public surname?: string,
        /**
        * User's date of birth
        */
        public dateOfBirth?: Date,
        /**
        * Photo is a URL with the image
        */
        public photo?: string,
        /**
        * If it is 1 the user is admin if it is 0 it is not admin
        */
        public admin?: boolean,
        /**
        * token expiration date
        */
        public exp?: number
    ) { }
}