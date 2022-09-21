import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales:Hospital[];
  public totalHospitales:number;
  public desde:number=0;
  public imgSubs:Subscription;
  public cargando=true;
  public ocultarSiguiente:boolean=false;
  public ocultarAnterior:boolean=true;

  constructor(private hospitalService:HospitalService, private modalImagenService:ModalImagenService
    ) { }
  ngOnDestroy(): void {
    this.imgSubs;
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs=this.modalImagenService.nuevaImagen.subscribe(resp=>{
      this.cargarHospitales();
    })
  }


  cargarHospitales(){
    this.cargando=true;
    this.hospitalService.cargarHospitales(this.desde).subscribe(({hospitales, total})=>{



    this.hospitales=hospitales;
      this.totalHospitales=total; 
      this.cargando=false;
      
    })
  }

  cambiarPagina(valor:number){
    this.ocultarAnterior=false;
    this.desde+=valor;

    if(this.desde<=0){
      this.ocultarAnterior=true;
      this.desde=0;
    }else if(this.desde>=this.totalHospitales){
      this.ocultarSiguiente=true;
      this.desde-=valor;
    }else{
      this.ocultarSiguiente=false;
    }

    this.cargarHospitales();
  }


  guardarCambios(hospital:Hospital){
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe(resp=>{
      Swal.fire('Actualizado', hospital.nombre, 'success');
      this.cargarHospitales();
    })
  }

  eliminarHospital(hospital:Hospital){
  
      Swal.fire({
        title: '¿Borrar Hospital?',
        text: `Esta a punto de borrar el ${hospital.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrarlo!'
      }).then((result) => {
        if (result.value) {
          this.hospitalService.deleteHospital(hospital._id).subscribe(resp=>{
            Swal.fire(
              'Usuario borrado!',
              `${hospital.nombre} fue eliminado  correctamente`,
              'success'

            );

            this.cargarHospitales();
          }
            )
        }
      })
    
  }

  async abrirSweetAlert(){
    const {value} = await Swal.fire<string>({
      title:'Crear hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton:true
      
    })
    if(value.trim().length>0){
      this.hospitalService.crearHospital(value).subscribe((resp:any)=>{
        Swal.fire('Se creo correctamente ', value, 'success');
        this.hospitales.push(resp.hospital)
      })
  
    }
    
    
  }

  abrirModal(hospital:Hospital){
    console.log(hospital)
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
    
  }



  
}
