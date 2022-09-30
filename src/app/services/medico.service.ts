import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Medico } from '../models/medico.model';
import { map, delay } from 'rxjs/operators';


const base_url=environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class MedicoService {



  constructor(private http:HttpClient) {
    console.log(this.headers);
   }


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



  crearMedico(medico:{nombre:string, hospital:string}){
    return this.http.post(`${base_url}/medicos`, medico, this.headers);
  }

  obtenerMedicosPaginacion(desde:number){
    return this.http.get(`${base_url}/medicos/paginacion?desde=${desde}`, this.headers).pipe(
      map ((resp:{medicos:Medico[], total:number})=>resp)
    )
  }

  obtenerMedicoPorId(id:string){

    return this.http.get(`${base_url}/medicos/${id}`, this.headers).pipe(
      
      map((resp:{ok: boolean, medico:Medico})=>resp.medico)
    )

  }

  obtenerMedicos(){
    return this.http.get(`${base_url}/medicos`, this.headers).pipe(
    map((resp:{medicos:Medico[]})=>resp.medicos)
    );
  }

  actualizarMedico(medico:Medico){
    const url = `${ base_url }/medicos/${ medico._id }`;
    return this.http.put( url, medico, this.headers );
    
}
  eliminarMedico(medico:Medico){
      return this.http.delete(`${base_url}/medicos/${medico._id}`, this.headers);  
  }

 
}
