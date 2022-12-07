import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../data/user';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { of, from } from "rxjs";
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<unknown>
  
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firstoreDB : AngularFirestore
  ) { 
    this.currentUser = this.afAuth.authState.pipe(
      switchMap(
        (user) => {
          if(user){
            return this.firstoreDB.doc(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }
     ));
  }

  public signUp(firstName: string, lastName: string, 
      email: string, password: string): Observable<boolean>{
        let success=true;
        this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(user=>{
          const tmpUser: AngularFirestoreDocument<User> = this.firstoreDB.doc(`users/${user.user?.uid}`);
          const updateUser = {
            id: user.user?.uid,
            email: user.user?.email,
            firstName,
            lastName,
            photo: 'https://firebasestorage.googleapis.com/v0/b/finalprojecttest-e7b45.appspot.com/o/default-img.jpg?alt=media&token=82c139a9-c3f5-4694-a9a1-4dba7914d24d',
            aboutMe: ""
          }
          tmpUser.set(updateUser);
        }).catch(error =>{
          console.log(error)
          success=false;
        });
        return of(success);
  }

  public login(email: string, password: string): Observable<boolean>{
    return from(this.afAuth.signInWithEmailAndPassword(email, password)
    .then(result=>{
      return true;
    }).catch(error =>{
      return false;
    }));
  }

  public logout(){
    this.afAuth.signOut()
    .then( ()=>{
        this.router.navigate(['/signin']);
      }
    );
  }

}
