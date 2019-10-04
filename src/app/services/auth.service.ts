import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(public angularFireAuth: AngularFireAuth, public router: Router) {
    this.angularFireAuth.authState.subscribe(user => {
      if(user){
        this.user = user;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['portfolio']);
      }
      else{
        sessionStorage.setItem('user', null);
      }
    })
  }

  async login(email: string, password: string){
    try{
      await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      this.router.navigate(['portfolio']);
    }
    catch (e) {
      alert("error " + e.message);
    }
  }

  async logout(){
    await this.angularFireAuth.auth.signOut();
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  public getCurrentUser(){
    return JSON.parse(sessionStorage.getItem('user'));
  }
}

