import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';

import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [

    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent


  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule, 
    FormsModule,
    ComponentsModule,
    NgChartsModule

  ],
  exports:[
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent,
    

  ]
})
export class PagesModule { }
