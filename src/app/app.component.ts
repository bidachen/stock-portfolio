import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stock-portfolio';

  constructor(private authService: AuthService, private router: Router,){  }
  
  ngOnInit(){}
  
  private logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
