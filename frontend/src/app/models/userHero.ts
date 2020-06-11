/**
 * UserHero class
 * class to work with the relations of users and heroes
 */
export class UserHero {
    /**
     * Constructor
     */
    constructor(
        /**
        * User's identifier
        */
        public idUsu: number,
        /**
         * Character's identifier
         */
        public idHero: number,
        /**
         * Punctuation given by the user to the hero
         */
        public score: number,
        /**
         * Comment given by the user to the hero
         */
        public comment: string,
        /**
         * If it is 1 the hero is favorite if it is 0 it is not
         */
        public favorite: boolean,
        /**
         * If it is 1 the hero is follow if it is 0 it is not
         */
        public follow: boolean,
    ) { }
}

