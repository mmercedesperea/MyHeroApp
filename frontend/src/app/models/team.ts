/**
 * Team class
 * Team class to work with it
 */
export class Team {
    /**
     * Constructor
     */
    constructor(
         /**
         * Team's identifier
         */
        public idTeam?: number,
         /**
         * User's identifier
         */
        public idUsu?: number,
         /**
         * Team's name
         */
        public teamName?: string,
         /**
         * Team's identifier member 1
         */
        public member_1?: string,
         /**
         * Team's identifier member 2
         */
        public member_2?: string,
         /**
         * Team's identifier member 3
         */
        public member_3?: string,
         /**
         * Team's identifier member 4
         */
        public member_4?: string,
         /**
         * Team's identifier member 5
         */
        public member_5?: string,
    ) { }

}