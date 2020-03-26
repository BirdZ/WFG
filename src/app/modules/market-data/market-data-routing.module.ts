import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketDataListComponent } from './components/market-data-list/market-data-list.component';

const routes: Routes = [
  { path: 'table', component: MarketDataListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketDataRoutingModule { }
