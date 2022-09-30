import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  
})
export class MedicoComponent implements OnInit {


  public medicoForm:FormGroup;
  public hospitales:Hospital[]=[];
  public hospitalSeleccionado:Hospital;

  constructor(private fb:FormBuilder, private medicoService:MedicoService, private hospitalService:HospitalService) { }

  ngOnInit(): void {

    this.medicoForm=this.fb.group({
      nombre:['Hernando', Validators.required],
      hospital:['', Validators.required]
    })

    this.cargarHospitales();
  
    //Observable, Va a esar pendiente cada que cambie el hospital 
    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalId=>{
      this.hospitalSeleccionado=this.hospitales.find(h=>h._id===hospitalId);

      console.log(this.hospitalSeleccionado.nombre)

    })

  }

  /* obtenerMedico(){
    this.medicoService.obtenerMedicos().subscribe((resp:any)=>{
      this.medicos=resp;
    })
  }
 */
  cargarHospitales(){
      this.hospitalService.cargarHospitales(0).subscribe((resp:any)=>{
        this.hospitales=resp.hospitales;
    
      })
  }

  guardarMedico(){
    console.log(this.medicoForm.value);
  }

}
