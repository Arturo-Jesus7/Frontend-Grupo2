import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Signalingservice {
  private channel = new BroadcastChannel('webrtc_channel');
  private messageSubject = new Subject<any>();
  public messages$ = this.messageSubject.asObservable();

  constructor() {
    this.channel.onmessage = (event) => {
      this.messageSubject.next(event.data);
    };
  }

  sendMessage(message: any) {
    this.messageSubject.next(message);
  }
}
