import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {Transaction} from '../models/transaction';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private db: AngularFirestore) { }

  public getBalance(currentUser){
    return this.db.doc('users/' + currentUser.email).snapshotChanges();
  }

  public updateBalance(currentUser, newBalance){
    return this.db.doc('users/' + currentUser.email).update({balance: newBalance});
  }

  public getTransactions(currentUser){
    return this.db.collection('users/' + currentUser.email + '/transactions').snapshotChanges()
    .pipe(map(actions => 
      actions.map(obj => {
        const data = obj.payload.doc.data();
        return {data};
      })));
;
  }

  public updateTransactions(currentUser, newTransaction){
    return this.db.collection('users/' + currentUser.email + '/transactions').add({
      type: newTransaction.type,
      stock: newTransaction.stock,
      numOfShares: newTransaction.numOfShares,
      price: newTransaction.price
    })
  }

}
