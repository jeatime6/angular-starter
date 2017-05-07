import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ng2-charts
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';

import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    DashboardRoutes
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }