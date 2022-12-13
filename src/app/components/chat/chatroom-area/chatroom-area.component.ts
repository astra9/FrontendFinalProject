import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Message } from 'src/app/data/message';
import { MessagingServiceService } from 'src/app/services/messaging-service.service';

type IdAndUserInfo = {
  [key: string]: any
};

@Component({
  selector: 'app-chatroom-area',
  templateUrl: './chatroom-area.component.html',
  styleUrls: ['./chatroom-area.component.css']
})
export class ChatroomAreaComponent implements OnDestroy {

  @ViewChild('scrollContainer')
  private scrollContainer!: ElementRef;
  private subscriptions: Subscription[] =[];
  public chatroom: Observable<any> = of(null);
  public messages: Message[] = [];
  public users: IdAndUserInfo={}
  public chatroomName: string = "";
  public messageText: string = "";
 
  constructor(
    private route: ActivatedRoute,
    private messagingService: MessagingServiceService,
    private firebaseDB: AngularFirestore
    ) 
    {
      this.subscriptions.push(
        this.messagingService.selectedChat.subscribe(chat => {
          this.chatroom=chat;
          if(chat!==null){ 
              this.chatroomName=chat.name
          }
        })
      )

      this.subscriptions.push(
        this.messagingService.chatMessages.subscribe(messages => {
          this.messages = messages
          if(this.messages!==null){
            this.messages.forEach(message => {
              let id:string = message.sender.id || "id";
              if(this.users[id]==null){
                this.subscriptions.push(
                  this.firebaseDB.collection("users").doc(id).get().subscribe(user=>{
                    this.users[id]=user.data()
                    if(message.sender!==null){
                      message.sender=this.users[id]
                    }
                  })
                )
              } else{
                if(message.sender!==null){
                  message.sender=this.users[id]
                 }
              }              
            })
          }
        })
      )

      this.scrollEnd();
      this.subscriptions.push(
        this.route.paramMap.subscribe(params => {
          const chatroomId = params.get('chatroomId');
          this.messagingService.changeChat.next(chatroomId);
        })
      )
  }

  ngAfterViewChecked(): void {
    this.scrollEnd();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe)
  }

  public submitMessage(text: string){
    this.messagingService.sendMessage(text)
    this.messageText="";
  }

  private scrollEnd(){
      if(this.scrollContainer){
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
  }

}
