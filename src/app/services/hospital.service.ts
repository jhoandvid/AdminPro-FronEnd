import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, pipe } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const baseUrl=environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(private http:HttpClient) { }
  get token():string{
    return localStorage.getItem('token'|| '');
  }

  get headers(){
    return{
      headers:{
        'x-token': this.token
      }
    }
  }

  cargarHospitales(desde:number){
    return this.http.get(`${baseUrl}/hospitales?desde=${desde}`, this.headers).pipe(

      map((resp:{ok:boolean, hospitales:Hospital[], total:number})=>resp)

    );

}


  crearHospital(nombre:string){
    return this.http.post(`${baseUrl}/hospitales`,{nombre}, this.headers);
  }

  actualizarHospital(_id:string, nombre:string ){
    return this.http.put(`${baseUrl}/hospitales/${_id}`,{nombre}, this.headers);
  }

  deleteHospital(_id:string ){
    return this.http.delete(`${baseUrl}/hospitales/${_id}`, this.headers);
  }

}
