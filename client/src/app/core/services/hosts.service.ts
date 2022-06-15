import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Host } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HostsService {
  private readonly webApi = environment.webApi;

  constructor(private http: HttpClient) { }

  getHosts(): Observable<Host[]> {
    return this.http.get<Host[]>(`${this.webApi}/hosts`);
  }
}
