import { Component, ElementRef, ViewChild } from '@angular/core';
import { Signaling } from '../../services/signaling';

@Component({
  selector: 'app-video-call',
  imports: [],
  templateUrl: './video-call.html',
  styleUrl: './video-call.css',
})
export class VideoCall {
  @ViewChild('localVideo', { static: true }) localVideo!: ElementRef;
  @ViewChild('remoteVideo', { static: true }) remoteVideo!: ElementRef;

  peer!: RTCPeerConnection;
  localStream!: MediaStream;

  constructor(private signaling: Signaling) {}

  ngOnInit() {
    this.initializeWebRTC();

    this.signaling.onMessage(async message => {

      if (message.type === 'offer') {
        await this.peer.setRemoteDescription(new RTCSessionDescription(message));
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(answer);
        this.signaling.send(answer);
      }

      if (message.type === 'answer') {
        await this.peer.setRemoteDescription(new RTCSessionDescription(message));
      }

      if (message.type === 'candidate') {
        await this.peer.addIceCandidate(message.candidate);
      }
    });
  }

  async initializeWebRTC() {

    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localVideo.nativeElement.srcObject = this.localStream;

    this.peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
      ]
    });

    this.localStream.getTracks().forEach(track => {
      this.peer.addTrack(track, this.localStream);
    });

    this.peer.onicecandidate = (event) => {
      if (event.candidate) {
        this.signaling.send({
          type: 'candidate',
          candidate: event.candidate
        });
      }
    };

    this.peer.ontrack = (event) => {
      this.remoteVideo.nativeElement.srcObject = event.streams[0];
    };
  }

  async startCall() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    this.signaling.send(offer);
  }
}
