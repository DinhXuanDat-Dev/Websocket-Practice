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

  }

  ngOnInit() {
    this.chatService.messages.subscribe(
      {
        next: msg => console.log('init msg', msg),
        error: err => console.error('Observable emitted an error: ' + err),
      }
    )
  }

  sendMsg() {
    this.chatService.sendMsg(this.userInput);
  }

  clearInput() {
    this.userInput = '';
  }
}
