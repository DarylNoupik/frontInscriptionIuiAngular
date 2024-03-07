import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlService {
  private origin: string;

  constructor() {
    // this.origin = environment.apiUrl;

    this.origin =
      // 'http://' + window.location.hostname + ':' + environment.port + '/';
      // 'http://' + window.location.hostname;
      'http://79.137.39.180';
  }

  getOrigin() {
    return this.origin;
  }
}
