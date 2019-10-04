import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from  "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  constructor(public angularFireAuth: AngularFireAuth,private db: AngularFirestore){}
  
  public createUser(newUser){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(
      newUser.value.email, newUser.value.password)
  }
  
  public saveUser(newUser){
    this.db.collection('users').doc(newUser.value.email).set({
      name: newUser.value.name,
      balance: 5000,
    }).then(res => {
      }).catch(e => alert('unable to connect to db!'));
}

}
