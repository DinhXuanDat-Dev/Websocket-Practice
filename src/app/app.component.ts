import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userInput: string = '';
  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg);
    });
  }

  private message = {
    author: "xuan dat",
    message: this.userInput
  };

  sendMsg() {
    this.message.message = this.userInput;
    console.log("new message from client to websocket: ", this.message);
    this.chatService.messages.next(this.message);
    this.clearInput();
  }

  clearInput() {
    this.userInput = '';
  }
}
