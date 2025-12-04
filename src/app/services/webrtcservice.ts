import { Injectable } from '@angular/core';
import { Signalingservice } from './signalingservice';

@Injectable({
  providedIn: 'root',
})
export class Webrtcservice {
  private peer!: RTCPeerConnection;
  private localStream!: MediaStream;

  constructor(private signaling: Signalingservice) {}

  async initPeer() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
      ]
    });

    this.peer.onicecandidate = (event) => {
      if (event.candidate) {
        this.signaling.sendMessage({ type: 'ice', candidate: event.candidate });
      }
    };

    return this.peer;
  }

  async getLocalStream(): Promise<MediaStream> {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    return this.localStream;
  }

  addLocalTracks() {
    this.localStream.getTracks().forEach(track => {
      this.peer.addTrack(track, this.localStream);
    });
  }

  async createOffer() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    return offer;
  }

  async createAnswer() {
    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(desc: RTCSessionDescriptionInit) {
    await this.peer.setRemoteDescription(desc);
  }

  onTrack(callback: (stream: MediaStream) => void) {
    this.peer.ontrack = (event) => callback(event.streams[0]);
  }

  public async addIceCandidate(candidate: RTCIceCandidateInit | RTCIceCandidate) {
    if (!this.peer) {
      console.warn('PeerConnection no inicializado; ignorando candidate');
      return;
    }
    try {
      await this.peer.addIceCandidate(candidate as RTCIceCandidateInit);
    } catch (err) {
      console.error('Error añadiendo ICE candidate', err);
    }
  }
  toggleAudio() {
    if (!this.localStream) return;

    const audioTrack = this.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
    }

    return audioTrack?.enabled;
  }

  toggleVideo() {
    if (!this.localStream) return;

    const videoTrack = this.localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
    }

    return videoTrack?.enabled;
  }
}
