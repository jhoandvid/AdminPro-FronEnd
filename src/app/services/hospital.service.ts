import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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

  getHospitales(desde:number){
    return this.http.get(`${baseUrl}/hospitales?desde=${desde}`, this.headers);
  }
  
}
