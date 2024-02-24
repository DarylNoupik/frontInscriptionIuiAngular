import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseUrlService } from './base-url.service';
import { IZone } from '../_interfaces/izone';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  url = '';

  constructor(private http: HttpClient, private baseUrlSvr: BaseUrlService) {
    this.url = `${this.baseUrlSvr.getOrigin()}${environment.administrationPath}`;
    this.url += 'zone/';
  }

  public liste(): Observable<IZone[]> {
    return this.http.get<IZone[]>(this.url + "all");
  }

  public getOne(id: number): Observable<IZone> {
    return this.http.get<IZone>(this.url + id);
  }

  public create(zone: IZone): Observable<IZone> {
    return this.http.post<IZone>(this.url + "create", zone);
  }

  public update(zone: IZone): Observable<IZone> {
    return this.http.patch<IZone>(this.url + zone?.id, zone);
  }

  public delete(idIZone: number): Observable<void> {
    return this.http.delete<void>(this.url + idIZone);
  }
}
