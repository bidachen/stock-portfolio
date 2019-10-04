import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

import {UserInfoService} from '../../services/user-info.service';
import {AuthService} from '../../services/auth.service';
import {StockApiService} from '../../services/stock-api.service';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements OnInit {
  newTranction: FormGroup;
  balance = 1234;
  public transactions = [];
  public dataSource;
  public displayedColumns = ['type', 'stock', 'numOfShares', 'price'];
  public stockValueTotle: number = 0;
  constructor(private formBuilder: FormBuilder, private userInfoService: UserInfoService, private authService: AuthService, private StockApiService: StockApiService) { }

  ngOnInit() {
    this.buildForm();

    this.getBalance();
    this.getTransactions();
  }

  public buildForm(){
    this.newTranction = this.formBuilder.group({
      ticker: ["", Validators.required],
      Qty: ["", Validators.compose([Validators.required, Validators.pattern('[0-9]{1,}'), Validators.min(1)])],
    });
  }
  
  //update max Qty can input
  public updateQty(){
    this.StockApiService.searchStock(this.newTranction.value.ticker).subscribe(
      res => {
        if (res['data']){
              this.newTranction.patchValue({'Qty': parseInt((this.balance / res["data"][0]["price"]).toString()).toString()})
              let max = this.newTranction.value.Qty;
              this.newTranction.controls['Qty'].setValidators([Validators.required, Validators.pattern('[0-9]{1,}'), Validators.min(1),Validators.max(max)])
            }
        else{
          alert('not found!');
        }
      }
    )
  }

  //buy new shares method,
  //check if the symbol is valid first, if it is valid then add it to the DB
  public buyClick(){
    var isAbleToBuy = true;
    this.StockApiService.searchStock(this.newTranction.value.ticker).subscribe(
      res => {
        if (res['data']){
            var newBalance = this.balance - this.newTranction.value.Qty * res["data"][0]["price"]
            newBalance = parseFloat(newBalance.toFixed(2));
            
            if (newBalance < 0){
              alert('not enough balance');
            }
            else{
              try{
                this.userInfoService.updateBalance(this.authService.getCurrentUser(), newBalance);
                
                const newTranction = {
                  type: 'BUY',
                  stock: this.newTranction.value.ticker,
                  numOfShares: this.newTranction.value.Qty,
                  price: parseFloat(res["data"][0]["price"])
                };
                this.userInfoService.updateTransactions(this.authService.getCurrentUser(), newTranction);
                alert('success!')
              }
              catch(e){
                alert('error!')
              }
            }
        }

        else{
          alert('not found!');
        }
      }
    )
  }

  public getBalance(){
    this.userInfoService.getBalance(this.authService.getCurrentUser()).subscribe(
      res => {
        this.balance = res.payload.data()['balance'];
      }
    );
  }

  public getTransactions(){
    this.userInfoService.getTransactions(this.authService.getCurrentUser()).subscribe(res => {
      this.transactions = [];
      res.forEach(item => {
        this.transactions.push(item.data);
      })
      this.dataSource = new MatTableDataSource(this.transactions);
      this.getStockValues();
    })
  }

  //using api to get current price of all shares the user has,
  //then update the color and totle value
  public getStockValues() {
    this.transactions.forEach(item => {
      this.StockApiService.searchStock(item.stock).subscribe(
        res => {
          this.stockValueTotle += res["data"][0]["price"] * item.numOfShares;
          item.price = res["data"][0]["price"];
          if (res["data"][0]["price"]> res["data"][0]["price_open"])
              item['color']='green'
          else if (res["data"][0]["price"]< res["data"][0]["price_open"])
              item['color']='red'
          else
              item['color']='gray'
          this.stockValueTotle = parseFloat(this.stockValueTotle.toFixed(2))
        })  
    })
  }
}
