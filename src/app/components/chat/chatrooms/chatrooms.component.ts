import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessagingServiceService } from 'src/app/services/messaging-service.service';

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.css']
})
export class ChatroomsComponent {

  public chatrooms: any[] = []

  @Output()
  chatClicked: EventEmitter<string> = new EventEmitter();

  constructor(
    public messagingService: MessagingServiceService,
    private firestoreDB: AngularFirestore
  ) {
    messagingService.chatrooms.subscribe(chats=>{
      this.chatrooms=chats;
    })
   }

  deleteChat(chatroomId: string){
    this.firestoreDB.collection("chats").doc(chatroomId).delete();
  }

  clickChatroom(){
    this.chatClicked.emit("chatroom-click")
  }

}
