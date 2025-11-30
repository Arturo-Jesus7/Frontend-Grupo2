import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Webrtcservice } from '../../services/webrtcservice';
import { Signalingservice } from '../../services/signalingservice';
import { Roomservice } from '../../services/roomservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-call',
  imports: [FormsModule],
  templateUrl: './video-call.html',
  styleUrls: ['./video-call.css'],
})
export class VideoCall implements OnInit{
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  roomId: string = '';
  joined = false;
  isCaller = false;
  offerReceived = false;

  audioEnabled = true;
  videoEnabled = true;

  constructor(
    private webrtc: Webrtcservice,
    private signaling: Signalingservice,
    private roomService: Roomservice
  ) {}

  ngOnInit() {
    this.signaling.messages$.subscribe((msg) => this.handleSignal(msg));
  }

  createRoom() {
    this.roomId = this.roomService.generateRoomId();
    alert("Comparte este Room ID: " + this.roomId);
  }

  async joinRoom() {
    this.joined = true;

    await this.webrtc.initPeer();

    const local = await this.webrtc.getLocalStream();
    this.localVideo.nativeElement.srcObject = local;
    this.webrtc.addLocalTracks();

    this.webrtc.onTrack((remote) => {
      this.remoteVideo.nativeElement.srcObject = remote;
    });

    setTimeout(async () => {
      if (!this.offerReceived) {
        this.isCaller = true;

        const offer = await this.webrtc.createOffer();
        this.signaling.sendMessage({
          type: 'offer',
          roomId: this.roomId,
          offer
        });
      }
    }, 500);
  }

  async handleSignal(msg: any) {
    if (msg.roomId !== this.roomId) return;

    switch (msg.type) {
      case 'offer':
        await this.handleOffer(msg.offer);
        break;
      case 'answer':
        await this.webrtc.setRemoteDescription(msg.answer);
        break;
      case 'ice':
        await this.webrtc.addIceCandidate(msg.candidate);
        break;
    }
  }

  async handleOffer(offer: RTCSessionDescriptionInit) {
    this.offerReceived = true;

    await this.webrtc.setRemoteDescription(offer);

    const answer = await this.webrtc.createAnswer();
    this.signaling.sendMessage({
      type: 'answer',
      roomId: this.roomId,
      answer
    });
  }
  toggleAudio() {
    this.audioEnabled = this.webrtc.toggleAudio()!;
  }

  toggleVideo() {
    this.videoEnabled = this.webrtc.toggleVideo()!;
  }
}
