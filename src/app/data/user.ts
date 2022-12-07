export class User {
    constructor(
        public id?: string,
        public firstName?: string,
        public lastName?: string,
        public photo?: string,
        public aboutMe?: string,
        public email?: string | null | undefined){}
}
