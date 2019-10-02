import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AlphaVantageApiService {
  readonly apiKey: string = environment.AlphaVantageAPIKey;
  readonly baseUrl: string = 'https://www.alphavantage.co/query?';

  constructor(private http: HttpClient) { }

  public getCurrentPrice(stock){
    const url = this.baseUrl + 'function=GLOBAL_QUOTE&symbol=' + stock  + '&apikey=' + this.apiKey;
    return this.http.get(url);
  }

  public searchStock(stock){
    const url = this.baseUrl + 'function=SYMBOL_SEARCH&keywords=' + stock + '&apikey=' + this.apiKey;
    return this.http.get(url);
  }
}
