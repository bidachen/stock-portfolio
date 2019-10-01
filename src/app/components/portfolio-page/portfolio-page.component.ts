import { Component, OnInit } from '@angular/core';
interface Transaction {
  type: string;
  stock: string;
  numOfShares: string;
  price: number;
}
@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
