import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Signaling {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080/signal');
  }

  send(message: any) {
    this.socket.send(JSON.stringify(message));
  }

  onMessage(callback: (msg: any) => void) {
    this.socket.onmessage = (event) => {
      callback(JSON.parse(event.data));
    };
  }
}
