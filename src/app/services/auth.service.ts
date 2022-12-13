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
  public tmpUser: unknown=undefined;
  
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
     this.setTmpUser();
  }

  public signUp(firstName: string, lastName: string, 
      email: string, password: string): Observable<boolean>{
        let success=true;
        this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(user=>{
          const tmpUser: AngularFirestoreDocument<User> = this.firstoreDB.doc(`users/${user.user?.uid}`);
          tmpUser.set({
            id: user.user?.uid,
            email: user.user?.email,
            firstName,
            lastName,
            photo: 'https://firebasestorage.googleapis.com/v0/b/finalproject-a7193.appspot.com/o/default-img.jpg?alt=media&token=3ec4e53c-8c86-4d5d-b6c9-64d790d6866d',
            aboutMe: "I am new here!"
          });
        }).catch(error =>{
          console.log(error)
          success=false;
        });
        return of(success);
  }

  public async login(email: string, password: string): Promise<Observable<boolean>>{
      let result = await this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result=>{
          return true;
        })
      .catch(error =>{
          return false;
        })
      
      return of(result)
  }

  public logout(){
    this.afAuth.signOut()
    .then( ()=>{
        this.router.navigate(['/signin']);
      }
    );
  }

  private setTmpUser(){
    this.currentUser.subscribe(user => {
      this.tmpUser = user
    })
  }

}
