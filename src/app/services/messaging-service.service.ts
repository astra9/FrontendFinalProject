import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class MessagingServiceService {

  public chatrooms: Observable<any>;
  public changeChat: BehaviorSubject<any> = new BehaviorSubject("");
  public selectedChat: Observable<any>;
  public chatMessages: Observable<any>;

  constructor(
    private firestoreDB: AngularFirestore,
    private authService: AuthService
  ) { 
    this.selectedChat = this.changeChat.pipe(switchMap(chatroomId => {
      if(chatroomId){
        return firestoreDB.doc(`chats/${chatroomId}`).valueChanges();
      }else{
        return of(null);
      }
    }));

    this.chatMessages = this.changeChat.pipe(switchMap(chatroomId => {
      if(chatroomId){
        return firestoreDB.collection(`chats/${chatroomId}/messages`, ref=>{
          return ref.orderBy('createdOn', 'asc').limit(50)
        }).valueChanges();
      }else{
        return of(null);
      }
    }));
    this.chatrooms = firestoreDB.collection('chats').valueChanges();
  }


  public sendMessage(text: string){
    this.firestoreDB.collection(`chats/${this.changeChat.value}/messages`).add(
      {
        message:text,
        createdOn: Timestamp.now(),
        sender: this.authService.tmpUser
     }
    )
  }
}
