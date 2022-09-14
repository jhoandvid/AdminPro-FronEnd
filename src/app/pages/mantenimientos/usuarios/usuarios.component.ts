import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';
import { identifierName } from '@angular/compiler';
import { ThemeService } from 'ng2-charts';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {



  public usuarios:Usuario[]=[];
  public totalUsuarios:number=0;
  public usuarioTemp=[];
  public desde:number=0;
  public cargando:boolean=true;
  public ocultarSiguiente:boolean=false;
  public ocultarAnterior:boolean=true;

  constructor(private usuarioService:UsuarioService, private busquedasService:BusquedasService) { 



  }

  ngOnInit(): void {
    this.CargarUsuarios();
  
  }


  CargarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(({total,usuarios})=>{
      this.totalUsuarios=total;
        this.usuarios=usuarios; 
        this.usuarioTemp=usuarios;
      this.cargando=false;
      })
  }

  cambiarPagina(valor:number){
    this.ocultarAnterior=false;
    this.desde+=valor;


    if(this.desde <= 0){
      this.ocultarAnterior=true;
      this.desde=0;
    }else if(this.desde>=this.totalUsuarios){
      this.ocultarSiguiente=true;
      this.desde-=valor;
    }else{
      this.ocultarSiguiente=false;
    }

    this.CargarUsuarios();
  }


  buscar(termino:string){

    if(termino.length===0){
      return this.usuarios=this.usuarioTemp;
    }
    
    this.busquedasService.buscar('usuarios', termino).subscribe(resultados=>{
      this.usuarios=resultados;

    })
    }


    eliminarUsuario(usuario:Usuario){

      if(usuario.uid===this.usuarioService.uid){
      
        return Swal.fire("Error", "No puede borrarse a si mismo", "error")
      }

      Swal.fire({
        title: '¿Borrar usuario?',
        text: `Esta a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrarlo!'
      }).then((result) => {
        if (result.value) {
          this.usuarioService.eliminarUsuarios(usuario).subscribe(res=>{
            Swal.fire(
              'Usuario borrado!',
              `${usuario.nombre} fue eliminado  correctamente`,
              'success'

            );

            this.CargarUsuarios();
          }
            )
        }
      })
    }


    cambiarRole(usuario:Usuario){
      this.usuarioService.guardarUsuario(usuario).subscribe(resp=>{
        console.log(resp)
      })
    }


    



}
