import { Component, OnInit } from '@angular/core';
import { MarketDataItemModel } from '../../models/market-data.model';
import { BehaviorSubject } from 'rxjs';
import { MarketDataRepositoryService } from '../../providers/repositories/market-data.repository';

@Component({
  selector: 'app-market-data-list',
  templateUrl: './market-data-list.component.html',
  styleUrls: ['./market-data-list.component.scss']
})
export class MarketDataListComponent implements OnInit {

  displayedColumns: string[] = ['key', 'v', 'd'];
  public marketDateList$: BehaviorSubject<MarketDataItemModel[]>;


  constructor(private repository: MarketDataRepositoryService) { }

  ngOnInit() {
    this.subscribeToMarketDataList();
    this.repository.loadList();
  }

  subscribeToMarketDataList() {
    this.marketDateList$ = this.repository.list();
  }

}

