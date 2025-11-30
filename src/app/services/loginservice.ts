import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import {JwtRequest} from "../models/jwtRequest";
import { isPlatformBrowser } from "@angular/common";


@Injectable({
  providedIn: 'root',
})

export class Loginservice {

constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object ) {

}
  private isBrowser(): boolean {

    return isPlatformBrowser(this.platformId);

  }
  login(request: JwtRequest) {
    return this.http.post('http://localhost:8080/login', request);
  }
  logout() {
  sessionStorage.removeItem('token');
  location.href = '/login'; // PRUEBA
  }
  verificar() {
    if (!this.isBrowser()) return false;
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    if (!this.isBrowser()) return null;
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role || null;
  }

}
