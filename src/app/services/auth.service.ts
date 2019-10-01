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
        localStorage.setItem('user', JSON.stringify(this.user));
      }
      else{
        localStorage.setItem('user', null);
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
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
