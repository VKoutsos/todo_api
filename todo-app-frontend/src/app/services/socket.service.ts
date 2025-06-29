import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  constructor(private authService: AuthService) {}

  connect(): void {
    if (this.socket&&this.socket.connected) return;//prevent double connection

    this.socket = io('http://localhost:5000', {
      transports: ['websocket']
    });

    // Emit user_connected once socket is connected
    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      const token = this.authService.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;
        this.socket.emit('user_connected', userId);
        console.log(`Emitted user_connected for userId: ${userId}`);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  listen(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();//clear all listeners
      this.socket.disconnect();
      console.log('Socket disconnected and listeners removed');
    }
  }
}
