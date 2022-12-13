import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { User } from 'src/app/data/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUser: any = of(null);
  public userById: any = of(null);
  public subscriptions: Subscription[]=[]
  public userPosts: any;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private firebaseDB: AngularFirestore,
    private router: Router,
  ) 
  {  
    this.subscriptions.push(
      this.auth.currentUser.subscribe(user=>{
        this.currentUser=user

      }))

    this.subscriptions.push(
        this.route.paramMap.subscribe(params => {
          const userId = params.get('userId');
          const userRef: AngularFirestoreDocument<User> = this.firebaseDB.doc(`users/${userId}`)
          userRef.valueChanges().subscribe(user=>{
            this.userById=user
            this.firebaseDB.collection('users/'+this.userById.id+'/posts').valueChanges()
              .subscribe(posts=>{
                this.userPosts=posts.map(item=>{
                 return item
                })
            })
          })
        })
    )
  }

  ngOnInit(): void {
   
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub=>sub.unsubscribe())
  }

  editProfile(){
    this.router.navigate(['/edit/'+this.currentUser.id]);
  }

  addPost(){
    this.router.navigate(['/add-post/'+this.currentUser.id]);
  }

  deletePost(id: string){
    console.log("users/"+this.currentUser.id+"/posts/")
    this.firebaseDB.collection("users/"+this.currentUser.id+"/posts/").doc(id).delete();
  }
  
}
