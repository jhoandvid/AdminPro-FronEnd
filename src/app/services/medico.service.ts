import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';

const base_url=environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class MedicoService {



  constructor(private http:HttpClient) { }


  get token(){
    return localStorage.getItem('token')||'';
  }



  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  crearMedico(medico:Medico){
    return this.http.post(`${base_url}/medicos`, medico, this.headers);
  }

  obtenerMedicosPaginacion(desde:number){
    return this.http.get(`${base_url}/medicos/paginacion?desde=${desde}`, this.headers).pipe(
      map ((resp:{medicos:Medico[], total:number})=>resp)
    )
  }

  obtenerMedicos(){
    return this.http.get(`${base_url}/medicos`, this.headers).pipe(
    map((resp:{medicos:Medico[]})=>resp.medicos)
    );
  }


  eliminarMedico(medico:Medico){
      return this.http.delete(`${base_url}/medicos/${medico._id}`, this.headers)   
  }

}
