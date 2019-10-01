import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map} from 'rxjs/operators';
import { AngularFireAuth } from  "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  constructor(public angularFireAuth: AngularFireAuth,private db: AngularFirestore){}
  createUser(newUser){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(
      newUser.value.email, newUser.value.password)
  }
  
  saveUser(newUser){
    this.db.collection('users').doc(newUser.value.email).set({
      name: newUser.value.name,
      balance: 5000,
    }).then(res => {
      this.db.collection('users/' + newUser.value.email + '/transactions').add({});
      });
}

}
