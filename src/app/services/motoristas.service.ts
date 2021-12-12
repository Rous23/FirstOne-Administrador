import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoristasService {

  constructor(private httpClient:HttpClient) { }

  obtenerMotoristas():Observable<any>{
    return this.httpClient.get(`http://localhost:8888/motoristas`);
  }

  actualizarMotorista(idMotoristas):Observable<any>{
    return this.httpClient.put(`http://localhost:8888/motoristas/${idMotoristas}/aprobar`,{});
  }
}
