import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Signaling {
  private socket: WebSocket;
  private roomCode: string = '';

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080/signal');

    this.socket.onopen = () => {
      console.log("Conectado al servidor WebSocket");
    };
  }

  joinRoom(roomCode: string) {
    this.roomCode = roomCode;

    this.send({
      type: 'join',
      room: roomCode
    });
  }

  send(message: any) {
    const msg = {
      ...message,
      room: this.roomCode   // agrega el room automáticamente
    };

    this.socket.send(JSON.stringify(msg));
  }

  onMessage(callback: (msg: any) => void) {
    this.socket.onmessage = (event) => {
      callback(JSON.parse(event.data));
    };
  }
}
