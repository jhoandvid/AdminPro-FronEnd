import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  public usuario:Usuario

  constructor( private usuariosService:UsuarioService) { 

      this.usuario=usuariosService.usuario;
  
  }



  logout(){
    this.usuariosService.logout();
  }

}
