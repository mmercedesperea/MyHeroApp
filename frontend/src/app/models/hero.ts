/**
 * Hero class
 * Hero class to work with it
 */
export class Hero {

    /**
     * Constructor
     */
    constructor(
        /**
         * character's identifier
         */
        public idHero?: number,
        /**
         * character's name
         */
        public heroName?: string,
        /**
        * image is a URL with the Hero image
        */
        public image?: string,
        /**
        * character's intelligence points
        */
        public intelligence?: number,
        /**
        * character's strength points
        */
        public strength?: number,
        /**
        * character's speed points
        */
        public speed?: number,
        /**
        * character's durability points
        */
        public durability?: number,
        /**
        * character's power points
        */
        public power?: number,
        /**
        * character's combat points
        */
        public combat?: number,
        /**
        * character's full name
        */
        public fullName?: string,
        /**
       * character's place of birth
        */
        public placeOfBirth?: string,
        /**
       * character's publisher e.g. Marvel, Dc
        */
        public publisher?: string,
        /**
        * character's aligment e.g. Good
        */
        public alignment?: string,
        /**
        * character's first Apperance e.g. 1st Marvel comic
        */
        public firstAppearance?: string,
        /**
        * character's gender
        */
        public gender?: string,
        /**
        * character's race 
        */
        public race?: string,
        /**
        * character's height e.g. 30cm
        */
        public height?: string,
        /**
        * character's weight e.g. 30Kg
        */
        public weight?: string,
        /**
        * character's eyes color
        */
        public eyeColor?: string,
        /**
        * character's hair color
        */
        public hairColor?: string,
        /**
        * character's work 
        */
        public work?: string,
        /**
        *  character's biography
        */
        public biography?: string,
        /**
        * insertion date in the bd
        */
        public createDate?: Date,
        /**
        * total stats points
        */
        public totalPoints?: number
    ) { }
}