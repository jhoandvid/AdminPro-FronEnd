import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { ChartData,  ChartType, } from 'chart.js';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})


export class Grafica1Component implements OnInit {
  baseDatsos:number[]=[]
  labels : string[] =  [ 'Dato2', 'Dato3', 'Dato4' ];
  datas: ChartData<'doughnut'> = {
    labels: this.labels,
    datasets: [
      { data: this.baseDatsos,
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        //hoverBackgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      }
    ]
  };





  constructor(private service:ServiceService) {

    this.service.getDatosEmpresa().subscribe(({labels,values})=>{

     this.datas={
      labels:labels,
      datasets:[{data:values}]
     }
     
    
    
 
 
  })

   }
 
 
 
 

  ngOnInit(): void {
    
  

  }
}
