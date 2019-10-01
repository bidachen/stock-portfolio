import { Component, OnInit, ViewChild} from '@angular/core';
interface Transaction {
  type: string;
  stock: string;
  numOfShares: string;
  price: number;
}

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss']
})

export class TransactionsPageComponent implements OnInit {
  
  public transactions: Transaction[] = [
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
    {type: 'BUY', stock: '(AAPL)', numOfShares: '6 shares', price: 200},
  ];

  public displayedColumns = ['type', 'stock', 'numOfShares', 'price'];
  constructor() { 
  }

  ngOnInit() {
  }

}
