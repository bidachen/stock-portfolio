import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  readonly apiKey: string = environment.StockAPIKey;
  readonly baseUrl: string = 'https://api.worldtradingdata.com/api/v1/stock?';

  constructor(private http: HttpClient) { }

  public getCurrentPrice(stock){
    const url = this.baseUrl + 'symbol=' + stock  + '&api_token=' + this.apiKey;
    return this.http.get('https://api.worldtradingdata.com/api/v1/stock?symbol=AAPL,MSFT,HSBA.L&api_token=50Ps9tUX9vFvdC9vUIyhwIPHIe5cNpecsySjiGAcDMjspxwZYo51UiZHH7vF');
  }

  public searchStock(stock){
    const url = this.baseUrl + 'symbol=' + stock + '&api_token=' + this.apiKey;
    return this.http.get(url);
  }
}
