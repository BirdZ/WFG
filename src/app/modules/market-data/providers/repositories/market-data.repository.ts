import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MarketDataItemModel } from '../../models/market-data.model';
import { MarketDataService } from '../../services/market-place.service';

@Injectable({
  providedIn: 'root'
})
export class MarketDataRepositoryService {

  private marketDataList$: BehaviorSubject<MarketDataItemModel[]>;

  constructor(private service: MarketDataService) { }

  public list(): BehaviorSubject<MarketDataItemModel[]> {
    if(!this.marketDataList$) {
      this.marketDataList$ = new BehaviorSubject<MarketDataItemModel[]>(undefined);
    }
    return this.marketDataList$;
  }

  public loadList = (): void => {
    this.service.list().subscribe((marketData: Partial<MarketDataItemModel>[]) => {
      this.marketDataList$.next(marketData as MarketDataItemModel[]);
    });
  }

}