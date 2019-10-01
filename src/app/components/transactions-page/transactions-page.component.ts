import { Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user-info.service';
import {AuthService} from '../../services/auth.service';
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
  constructor(private userInfoService: UserInfoService, private authService: AuthService) { 
  }

  ngOnInit() {
  }

  public getTransactions(){
    this.userInfoService.getTransactions(this.authService.getCurrentUser()).subscribe(res => {
      console.log(res.payload.data())
    });
  }
}
