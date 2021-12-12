import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(private httpClient:HttpClient) { }

  obtenerOrdenesDisponibles():Observable<any>{
    return this.httpClient.get(`http://localhost:8888/ordenes-disponibles`);
  }

  obtenerOrdenesRealizadas():Observable<any>{
    return this.httpClient.get(`http://localhost:8888/ordenes-realizadas`);
  }

}
