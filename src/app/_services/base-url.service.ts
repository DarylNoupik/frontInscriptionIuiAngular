import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlService {
  private origin: string;

  constructor() {
    // this.origin = environment.apiUrl;
    this.origin = "http://51.178.136.105"
    //this.origin = 'https://inscription.ucac-icam.com';
  }

  getOrigin() {
    return this.origin;
  }
}
