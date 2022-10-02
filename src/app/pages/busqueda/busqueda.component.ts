import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[]=[];
  public medicos:Medico[]=[];
  public hospitales:Hospital[]=[];

  constructor(private activeteRoute:ActivatedRoute, private busquedasServices:BusquedasService) { }

  ngOnInit(): void {
    this.activeteRoute.params.subscribe(({termino})=>this.busquedaGlobal(termino))
  }


  busquedaGlobal(termino:string){
    this.busquedasServices.buquedaGlobal(termino).subscribe((resp:any)=>{
       console.log(resp);
       this.usuarios=resp.usuarios;
       this.medicos=resp.medicos;
       this.hospitales=resp.hospitales;

    })
    

  }


}
