import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  
})
export class MedicoComponent implements OnInit {


  public medicoForm:FormGroup;
  public hospitales:Hospital[]=[];
  public hospitalSeleccionado:Hospital;
  public medicoSeleccionado:Medico;
  public mensaje;

  constructor(private fb:FormBuilder, private medicoService:MedicoService, private hospitalService:HospitalService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id})=>{
      this.cargarMedico(id);
    })
  
    //this.medicoService.obtenerMedicoPorId()

    this.medicoForm=this.fb.group({
      nombre:['', Validators.required],
      hospital:['', Validators.required]
    })

    this.cargarHospitales();
  
    //Observable, Va a esar pendiente cada que cambie el hospital 
    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalId=>{
      this.hospitalSeleccionado=this.hospitales.find(h=>h._id===hospitalId);
    })

  }

  cargarMedico(id:string){
    if(id==='nuevo'){
      this.mensaje="Crear"
      return;
    }

    this.mensaje="Actualizar"
      this.medicoService.obtenerMedicoPorId(id).pipe(
        delay(200)
      )
      .subscribe( {

        next:(medico)=> {
          const { nombre, hospital:{ _id } } = medico; 
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({ nombre, hospital: _id })
        }, 
      
        error:()=>this.router.navigateByUrl('/dashboard/medicos')
  }
  )
}


  cargarHospitales(){
      this.hospitalService.cargarHospitales(0).subscribe((resp:any)=>{
        this.hospitales=resp.hospitales;
    
      })
  }

  guardarMedico(){
    const {nombre}=this.medicoForm.value;

    if(this.medicoSeleccionado){
      //Actualizar
      const data={
        ...this.medicoForm.value,
        _id:this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data).subscribe(resp=>{
        Swal.fire('Actualizao', `${nombre} actualizado correctamente`, 'success');
      })

    }else{

      //crear
     

      this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp:any)=>{
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
      })

    }


   
  }

}
