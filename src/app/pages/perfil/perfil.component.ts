import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {


  public perfilForm:FormGroup;
  public usuario:Usuario;
  public imagenSubir:File;

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private fileUploadService:FileUploadService) {

      this.usuario=usuarioService.usuario;

   }

  ngOnInit(): void {

    this.perfilForm=this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email,[Validators.required, Validators.email]]
    })


  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(()=>{
      const {nombre, email}=this.perfilForm.value;
      this.usuario.nombre=nombre;
      this.usuario.email=email;
      console.log(nombre, email)
    })
  }

  cambiarImagen(event:any){
    this.imagenSubir=event.files[0];
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid).then(resp=>{
      console.log(resp)
    })
  }

}
