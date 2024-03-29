import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Subject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class WebsocketService {

  // Our socket connection
  private socket: any;

  constructor() { }

  connect(): Subject<MessageEvent> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    this.socket = io(environment.ws_url);

    console.log('socket',this.socket);
    
    // We define our observable which will observe any incoming messages
    // from our socket.io server.

    let observable = new Observable(observer => {
        this.socket.on('message', (data: unknown) => {
          console.log("Received message from Websocket Server")
          observer.next(data);
        })
        return () => {
          this.socket.disconnect();
        }
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: Object) => {
            this.socket.emit('message', JSON.stringify(data));
        },
    };

    // we return our Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable);
  }

}