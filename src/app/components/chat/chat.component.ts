import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public showChatRooms:boolean=false;
  constructor(private route: ActivatedRoute) {
   }

  eventHandlerFunc(eventValue:string){
    this.toggleShowChatRooms()
  }

  ngOnInit(): void {
  }

  toggleShowChatRooms(){
    this.showChatRooms=!this.showChatRooms;
  }

  classesShowChatrooms(){
    if(this.showChatRooms){
      return "d-flex show-chatrooms-container open"
    } else{
      return "d-flex show-chatrooms-container close"
    }
  }
}
