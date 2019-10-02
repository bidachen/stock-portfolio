import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

import {UserInfoService} from '../../services/user-info.service';
import {AuthService} from '../../services/auth.service';
import {AlphaVantageApiService} from '../../services/alpha-vantage-api.service';
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
  constructor(private formBuilder: FormBuilder, private userInfoService: UserInfoService, private authService: AuthService, private alphaVantageApiService: AlphaVantageApiService) { }

  ngOnInit() {
    this.buildForm();

    this.getBalance();
    this.getTransactions();
  }

  public buildForm(){
    this.newTranction = this.formBuilder.group({
      ticker: ["", Validators.required],
      Qty: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{1,}'), Validators.min(1)])],
    });
  }
  
  public updateQty(){
    this.alphaVantageApiService.searchStock(this.newTranction.value.ticker).subscribe(
      res => {
        if (res['bestMatches'] && res['bestMatches'][0]['9. matchScore'] == '1.0000'){
          this.alphaVantageApiService.getCurrentPrice(this.newTranction.value.ticker).subscribe(res => {
            if (!res["Global Quote"]){
              alert('change too frequent!');
            }
            else{
              this.newTranction.patchValue({'Qty': parseInt(this.balance / res["Global Quote"]["05. price"])})
              let max = this.newTranction.value.Qty;
              this.newTranction.controls['Qty'].setValidators([Validators.required, Validators.pattern('[0-9]{1,}'), Validators.min(1),Validators.max(max)])
            }
          })
        }

        else{
          alert('invalid!');
        }
      }
    )
  }

  public buyClick(){
    var isAbleToBuy = true;
    this.alphaVantageApiService.searchStock(this.newTranction.value.ticker).subscribe(
      res => {
        if (res['bestMatches'] && res['bestMatches'][0]['9. matchScore'] == '1.0000'){
          this.alphaVantageApiService.getCurrentPrice(this.newTranction.value.ticker).subscribe(res => {
            var newBalance = this.balance - this.newTranction.value.Qty * res["Global Quote"]["05. price"]
            newBalance = parseFloat(newBalance.toFixed(2));
            
            if (!res["Global Quote"] || newBalance < 0){
              alert('api not responding or not enough balance');
            }
            else{
              try{
                this.userInfoService.updateBalance(this.authService.getCurrentUser(), newBalance);
                
                const newTranction = {
                  type: 'BUY',
                  stock: this.newTranction.value.ticker,
                  numOfShares: this.newTranction.value.Qty,
                  price: parseFloat(res["Global Quote"]["05. price"])
                };
                this.userInfoService.updateTransactions(this.authService.getCurrentUser(), newTranction);
                alert('success!')
              }
              catch(e){
                alert('error!')
              }
            }
          })
        }
      }
    )

    //if (this.alphaVantageApiService.searchStock(this.newTranction.value.ticker))
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

  public getStockValues() {
    this.transactions.forEach(item => {
          this.stockValueTotle += item.price * item.numOfShares;
    })

  }
}
