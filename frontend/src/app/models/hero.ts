export class Hero {
    constructor(
        public idHero?: number,
        public heroName?: string,
        public image?: string,
        public intelligence?: number,
        public strength?: number,
        public speed?: number,
        public durability?: number,
        public power?: number,
        public combat?: number,
        public fullName?: string,
        public placeOfBirth?: string,
        public publisher?: string,
        public alignment?: string,
        public firstApperance?: string,
        public gender?: string,
        public race?: string,
        public height?: string,
        public weight?: string,
        public eyeColor?: string,
        public hairColor?: string,
        public work?: string,
        public biography?: string,
        public createDate?: Date,
        public totalPoints?:number
    ) { }
}