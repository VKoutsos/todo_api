// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly SOCKET_URL = 'http://localhost:5000'; // Hardcoded backend URL

  constructor(private authService: AuthService) {
    this.socket = io(this.SOCKET_URL, {
      withCredentials: true,
      autoConnect: false
    });
  }

  // Rest of your socket service methods remain the same
  connect(userId: string) {
    if (!this.socket.connected) {
      this.socket.connect();
      this.socket.emit('register', userId);
    }
  }

  onNotification(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }
}
