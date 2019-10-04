import { Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user-info.service';
import {AuthService} from '../../services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
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
  
  public transactions = [];
  public dataSource;

  public displayedColumns = ['type', 'stock', 'numOfShares', 'price'];
  constructor(private userInfoService: UserInfoService, private authService: AuthService) { 
  }

  ngOnInit() {
    this.getTransactions()
  }

  public getTransactions(){
    this.userInfoService.getTransactions(this.authService.getCurrentUser()).subscribe(res => {
      res.forEach(item => {
        this.transactions.push(item.data);
      })
      this.dataSource = new MatTableDataSource(this.transactions);
    })
  }
}
