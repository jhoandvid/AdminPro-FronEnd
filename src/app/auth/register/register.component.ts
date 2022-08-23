import { Component} from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted=false;

  public registerForm=this.fb.group({
    nombre:['Jhoan David', [Validators.required, Validators.minLength(3)]],
    email:['rojas@gmail.com', [Validators.required, Validators.email]],
    password:['123', Validators.required],
    password2:['123', Validators.required],
    terminos:[false, Validators.required],

  });

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private router:Router) { }

  crearUsuario(){
    console.log(this.registerForm.value);

    this.formSubmitted=true;


    if(this.registerForm.get('terminos')?.value===false){
      this.registerForm.controls.terminos.setErrors({campoNoSeleccionado:true})
      return;
    }else{
      if(this.registerForm.valid && !this.contrasenasNoValidas()){

        //Crear usuario
        this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
          next:(res:any)=>{
            this.router.navigateByUrl('/');
          },
          error:(err)=>{
            //Si sucede algun error
            Swal.fire('Error', err.error.msg, 'error');
          }
        });
      
      }else{
        this.registerForm.controls.password.setErrors({NoEsIgual:true});
        return;
      }  
    }
  }

  campoNoValido(campo:string):boolean{
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
        return true;
    }else{
      return false
    }
  }

  contrasenasNoValidas(){
    const pass1=this.registerForm.get('password')?.value;
    const pass2=this.registerForm.get('password2')?.value;

    if((pass1!==pass2) && this.formSubmitted){

      return true;
    }else{

      return false;
    }

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }


  
  
      
}
