import { Component, Input, OnInit, SimpleChanges, OnChanges, ɵisListLikeIterable } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() nombre:string="Sin Titulo";





  constructor() { }
 

  ngOnInit(): void {
  }


  
   // Doughnut
   @Input('labels') public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
   @Input('data') public doughnutChartData: ChartData<'doughnut'> = {
     labels: this.doughnutChartLabels,
     datasets: [
       { data: [ 250, 300, 100 ], backgroundColor:['#6857E6', '#009FEE', '#F02059'] }
     ]
   };
   public doughnutChartType: ChartType = 'doughnut';

  
 


}
