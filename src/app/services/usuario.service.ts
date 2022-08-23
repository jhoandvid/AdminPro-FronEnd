import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interface/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interface/login.form.interface';
import { tap, take, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google:any;

const base_url=environment.base_url;


 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private router:Router, private ngZone:NgZone, ) { 
    this.googleinit(); 
  }


  googleinit(){
    google.accounts.id.initialize({
      client_id: "257966571488-1s43o2oa1r4gg0rstvoo0m9r49j38gvq.apps.googleusercontent.com",
      callback: (response:any)=>{
        this.loginGoogle(response.credential).subscribe({
          next: (res)=>{
            this.ngZone.run(()=>{
    
              this.router.navigateByUrl('/')
            })
          },
    
          error: (err)=>console.log(err.error)
    
        })
      }
      });
  }

  
  logout(){
    localStorage.removeItem('token');
    const emailGoogle=localStorage.getItem('email');
     google.accounts.id.revoke(emailGoogle,()=>{
      this.ngZone.run(()=>{
       this.router.navigateByUrl('/login')
       localStorage.removeItem('email')
      })
    }) 

    
  }

/* 
  , ()=>{
    this.ngZone.run(()=>{
      window.location.reload()
     this.router.navigateByUrl('/login')
    })
  }) */
  validarToken():Observable<boolean>{
     
    const token=localStorage.getItem('token') || '';
  
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any)=>{
          localStorage.setItem('token', resp.token)
      }),
      map(resp=>true),
      catchError(error=>of(false))
    )
  }
  

  crearUsuario(formData:RegisterForm){
    return this.http.post(`${ base_url }/usuarios`, formData).pipe(
      tap((res:any)=>{
        localStorage.setItem("token", res.token);
      })
    )
  }

  loginUsuario(formData:LoginForm){
    return this.http.post(`${ base_url }/login`, formData).pipe(
      tap((res:any)=>{
        localStorage.setItem('token', res.token);
      })
    )
  }


  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((resp:any)=>{
       /*  emailGoogle=resp.email; */
          localStorage.setItem('token', resp.token)
          localStorage.setItem('email', resp.email)
      })
    )
  }
}
