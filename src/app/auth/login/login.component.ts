import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2'

declare const google:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  AfterViewInit{

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSubmmitted=true;

  public loginForm=this.fb.group({
      email:[localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password:['', [Validators.required]],
      remember:[false]
  })



  constructor(private fb:FormBuilder, private router:Router, private usuarioService:UsuarioService, private ngZone:NgZone ) { 
  }

  ngAfterViewInit(): void {
    this.googleInit();  
  }


  googleInit(){
    this.usuarioService.googleinit();
      google.accounts.id.renderButton(
        this.googleBtn.nativeElement,
        { theme: "outline", size: "large" }  // customization attributes
      );
  }

 

  login(){

    if(this.loginForm.invalid){
      return;
    }


    this.usuarioService.loginUsuario(this.loginForm.value).subscribe({

      next: ((res:any)=>{
        if(this.loginForm.get('remember').value==true){
          localStorage.setItem('email', this.loginForm.get('email').value);
        }else{
          localStorage.removeItem('email');
        }
        
        this.router.navigateByUrl('/')

        
      
      }),
      error: (err=>{
        Swal.fire('Error', err.error.msg, 'error');
      })

    })
  }
/* 
  campoNoValido(campo){
    console.log(campo)
  } */

}
