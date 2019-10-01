import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map} from 'rxjs/operators';
import { AngularFireAuth } from  "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  constructor(public angularFireAuth: AngularFireAuth,private db: AngularFirestore){}
  async createUser(newUser){
    try{
      await this.angularFireAuth.auth.createUserWithEmailAndPassword(
      newUser.value.email, newUser.value.password
    )
      this.saveUser(newUser);
      return;
    }
    catch(e) {
      alert(e.message);
    }

  }
  
  saveUser(newUser){
    this.db.collection('users').doc(newUser.value.email).set({
      name: newUser.value.name,
    }).then(res => {return;})
    .catch(e => {console.log(e)});
    this.db.collection('users/' + newUser.value.email + '/transactions').add({});
}

}
