import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HTTPService } from 'src/app/core/services/http.service';
import { MarketDataItemModel } from '../models/market-data.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

  private API_URL: string;
  constructor(protected server: HTTPService) {
    this.API_URL = environment.marketData;
  }

  /* ============ CRUD ============ */

  /**
   * GET Request. Get all elements of resource
   */
  public list(): Observable<any[]> {
    return this.server.get<any[]>(this.API_URL)
    .pipe(map((result: any) => {
      const list = [];
      Object.keys(result.quotes[0].fields)
      .forEach((key: string) => list.push(new MarketDataItemModel(key, result.quotes[0].fields[key].v, result.quotes[0].fields[key].d)));
      return list;
    }
    ));
  }
}