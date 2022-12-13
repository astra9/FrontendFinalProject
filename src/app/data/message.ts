import { User } from "./user";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

export class Message {
    constructor(
        public message: string, 
        public createdOn: Timestamp,
        public sender: User){}
}
