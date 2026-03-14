import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { houseClass } from '../class/houseClass';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private apiUrl: string = 'http://localhost:3000/house';

  constructor(private http: HttpClient) {}

  //CREATE
  public add(house: houseClass): Observable<any> {
    return this.http.post(this.apiUrl + '/create', house, {observe: 'response'});
  }

  //READ
  public getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  //UPDATE
  public update(house: houseClass): Observable<any> {
    return this.http.put(this.apiUrl + '/' + house.houseId, house, {observe: 'response'});
  }

  //DELETE
  public delete(houseId: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + houseId, {observe: 'response'});
  }
}
