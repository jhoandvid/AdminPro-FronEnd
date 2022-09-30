import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  public desde:number=0;
  public medicos:Medico[];
  public medicosTemp=[];
  public imgSubs:Subscription;
  public ocultarSiguiente=false;
  public ocultarAnterior=true;
  public cargando=false;
  public totalMedicos:number;


  constructor(private medicoService:MedicoService, private busquedaService:BusquedasService, private modalImagenService:ModalImagenService) { }
 
 
  ngOnInit(): void {

    this.imgSubs=this.imgSubs=this.modalImagenService.nuevaImagen.subscribe(resp=>{
      this.cargarMedicos();
    })
    this.cargarMedicos();
  
  
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  cargarMedicos(){
    this.cargando=true;
    this.medicoService.obtenerMedicosPaginacion(this.desde).subscribe(({medicos, total})=>{
      this.medicos=medicos;
      this.medicosTemp=medicos;
      this.totalMedicos=total;
      this.cargando=false;
    })
  }


  paginacion(valor:number){
    this.ocultarAnterior=false;
    this.desde+=valor;

    if(this.desde<=0){
      this.ocultarAnterior=true;

      this.desde=0;
    }else if(this.desde>=this.totalMedicos){
      this.ocultarSiguiente=true;
      this.desde-=valor;
    }else{
      this.ocultarSiguiente=false;
    }
    this.cargarMedicos();
  }


  busqueda(termino:string){
    if(termino.length===0){
      return this.medicos=this.medicosTemp;
    }

    this.busquedaService.buscar("medicos", termino).subscribe(resp=>{
      this.medicos=resp;
    })

  }

  

/*   async abrirSweetAlert(){
    const {value=""}=await Swal.fire<string>({
      title:'Crear Medico',
      text:'Ingrese el nombre del nuevo medico',
      input:'text',
      inputPlaceholder:'Nombre del medico', 
      showCancelButton:true
    })

    if(value.trim().length>0){



       this.medicoService.crearMedico(value).subscribe((resp:any)=>{
        Swal.fire('Se creo correctamente', value, 'success');
        this.medicos.push(resp.medico)
      }) 
    }
  }
 */
  eliminarMedico(medico:Medico){

    Swal.fire({
      title:'Borrar Medico',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon:'question',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Si, Borrarlo!'
    }).then((result)=>{

      if(result.value){

        this.medicoService.eliminarMedico(medico).subscribe(resp=>{
        Swal.fire(
          'Medico borrado!',
          `${medico.nombre} fue eliminado correctamente`,
          'success'
        );
        
        this.cargarMedicos();
       
       })

      }
      })
      }
     
      abrirModal(medico:Medico){
          this.modalImagenService.abrirModal("medicos", medico._id, medico.img);

      }
   
  


}
