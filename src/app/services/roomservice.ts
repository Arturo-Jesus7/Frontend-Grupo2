import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Roomservice {
  generateRoomId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
