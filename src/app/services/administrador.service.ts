import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private httpClient:HttpClient) { }

  inicioSesion(datos):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/administrador`, datos);
  }
}
