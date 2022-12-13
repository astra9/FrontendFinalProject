import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css']
})
export class CreateChatComponent implements OnInit {

  public createChatForm: FormGroup = new FormGroup({
    chatName:  new FormControl("", {validators:[Validators.required, Validators.minLength(8)]})
  });;
  private subscriptions: Subscription[]=[];
  private redirectUrl: string="";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestoreDB: AngularFirestore) { 
  }

  ngOnInit(): void {
    this.redirectUrl=this.route.snapshot.queryParams["redirectUrl"] || '/chat';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe())
  }

  public async submitForm() {
    if(this.createChatForm.valid){
      const {chatName} = this.createChatForm.value;
      let chat = {
        id: "",
        name: chatName
      }
      let ref = await this.firestoreDB.collection('chats').add(chat)
      chat.id=ref.id 
      ref.set(chat)
      let initialMessage = {
        message:"This is a starter message! Welcome to the chat!",
        createdOn: Timestamp.now(),
        sender: {
          id: "Fl4XE9LLtdjmuNeetbiw",
          firstName: "Chat",
          lastName: "Bot",
          photo: "https://firebasestorage.googleapis.com/v0/b/finalproject-a7193.appspot.com/o/pexels-kindel-media-8566472(1).jpg?alt=media&token=7f6c472d-1e65-46d4-8b8f-a6574f093657",
          aboutMe: "I am a chat bot!",
          email: "bot@no-reply.com"
        }
      }
      this.firestoreDB.collection('chats').doc(ref.id).collection("messages").add(initialMessage)
      this.router.navigateByUrl(this.redirectUrl);
      
    } else{

    }
    
  }
}


