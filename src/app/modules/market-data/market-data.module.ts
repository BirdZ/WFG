import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketDataListComponent } from './components/market-data-list/market-data-list.component';
import { MatTableModule } from '@angular/material/table';
import { MarketDataRoutingModule } from './market-data-routing.module';

@NgModule({
  declarations: [MarketDataListComponent],
  imports: [
    CommonModule,
    MarketDataRoutingModule,
    MatTableModule
  ]
})
export class MarketDataModule { }
