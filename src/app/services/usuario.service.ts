import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interface/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interface/login.form.interface';
import { tap, take, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interface/cargar-usuarios.interfaces';

declare const google:any;

const base_url=environment.base_url;




 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario:Usuario

  constructor(private http:HttpClient, private router:Router, private ngZone:NgZone, ) { 
    this.googleinit(); 
  }

  get token(){
    return localStorage.getItem('token')||'';
  }
  get uid(){
    return this.usuario.uid || '';
  }

  get role():'ADMIN_ROLE' | 'USER_ROLE'{
      return this.usuario.role;
  }



  get headers(){

    return {
      headers:{
        'x-token':this.token
      }
    }
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


  guardarLocalStorage(resp:any){
        localStorage.setItem('token', resp.token ); 
        localStorage.setItem('menu',  JSON.stringify(resp.menu) );
  }

  
  logout(){

    //TODO: Borrar Menu
  
   
    const emailGoogle=localStorage.getItem('email');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
     google.accounts.id.revoke(emailGoogle,()=>{
      this.ngZone.run(()=>{
       this.router.navigateByUrl('/login')
      })
    }) 

    
  }


  validarToken():Observable<boolean>{
     
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(

        
      map((resp:any)=>{
        const{nombre, email, img='', google, role, uid}=resp.usuario;
        this.usuario=new Usuario(nombre, email,'',img,google,role,uid)
        this.guardarLocalStorage(resp);
        return true;
      }),
      catchError(error=>of(false))
    )
  }
  

  crearUsuario(formData:RegisterForm){
    return this.http.post(`${ base_url }/usuarios`, formData).pipe(
      tap((res:any)=>{
        this.guardarLocalStorage(res);
      })
    )
  }

  loginUsuario(formData:LoginForm){
    return this.http.post(`${ base_url }/login`, formData).pipe(
      tap((res:any)=>{
        this.guardarLocalStorage(res);
      })
    )
  }


  actualizarPerfil(data:{email:string, nombre:string, role:string}){

    data={
      ...data,
      role:this.usuario.role
    }

       return this.http.put(`${base_url}/usuarios/${this.uid}`, data,this.headers);
  }

  guardarUsuario(usuario:Usuario){
    console.log(usuario);
    return this.http.put(`${base_url}/usuarios/${usuario.uid}/role`, usuario,this.headers);
}


  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((resp:any)=>{
       /*  emailGoogle=resp.email; */
       localStorage.setItem("email", resp.email);
       this.guardarLocalStorage(resp);
      })
    )
  }

  cargarUsuarios(desde:number=0){
      return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`, this.headers).pipe(
     
        map(resp=>{
          const usuarios=resp.usuarios.map(user=>new Usuario(user.nombre, user.email, '',
           user.img,  user.google, user.role, user.uid ));
        
          return {
            total:resp.total,
            usuarios 
          }
        })
      )
  }


  eliminarUsuarios(usuario:Usuario){

    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`, this.headers); 
  }

  

}
