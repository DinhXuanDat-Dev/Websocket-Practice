import { Injectable } from "@angular/core";
import { Subject, catchError, map, throwError } from "rxjs";
import { WebsocketService } from "./websocket.service";

@Injectable()
export class ChatService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(
    _wsService: WebsocketService
  ) {

    this.messages = <Subject<any>>_wsService
      .connect()
      .pipe(
        map((response: any): any => {
          console.log('response', response);
          return response;
        }),
        catchError((error: any) => {
          // Handle the error here
          console.error('An error occurred:', error);
          // Optionally, you can throw a new error or return a fallback value
          return throwError('An error occurred'); // Example of throwing a new error
          // or return of(null); // Example of returning a fallback value
        })
      );

  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg: any) {
    this.messages.next(msg);
  }

}