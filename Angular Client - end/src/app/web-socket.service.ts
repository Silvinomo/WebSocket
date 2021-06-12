import { Injectable } from "@angular/core";
import { io } from "socket.io-client";
import { Observable } from "rxjs";

@Injectable()
export class WebSocketService {
  socket: any;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
  }
}
