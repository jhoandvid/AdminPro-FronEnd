import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getDatos(){
    return  this.http.get('http://localhost:3000/Registros')
  }

  getDatosEmpresa(){
    return this.getDatos().pipe(map(data=>{
      const labels=Object.keys(data);
      const values=Object.values(data);

      return {labels, values}
    })) 
  
  }





}
