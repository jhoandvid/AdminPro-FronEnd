import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  constructor(private hospitalService:HospitalService) { }

  ngOnInit(): void {
    this.cargarHospitales(0);
  }


  cargarHospitales(desde:number){
    this.hospitalService.getHospitales(desde).subscribe(resp=>{
      console.log(resp);
    })
  }

}
