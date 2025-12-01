import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingPage {
  @ViewChild('servicesSection') servicesSection!: ElementRef;

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  scheduleAppointment() {
    alert('¡Pronto podrás agendar tu cita!');
    // Puedes redirigir a /citas o abrir un modal
  }

  scrollToServices() {
    this.servicesSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}