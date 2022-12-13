import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firebaseDB: AngularFirestore) { 
      this.subscriptions.push(
        this.route.paramMap.subscribe(params => {
          const userId = params.get('userId');
          this.userId=userId;
        }))
  }

  public addPostForm: FormGroup = new FormGroup({
    text:  new FormControl("", {
        validators: [Validators.required, Validators.minLength(10)]
    })
  });;
  public userId: string|null = ""
  private subscriptions: Subscription[] =[]

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe())
  }

  public submitForm(): void{
    if(this.addPostForm.valid){
      const {text} = this.addPostForm.value
      this.addPost(text)
    } else{
    
    }
  }

  private async addPost(text:string){
    let post = {
      id:"",
      text
    }
    let ref = await this.firebaseDB.collection('users/'+this.userId+'/posts').add(post)
    post.id=ref.id
    ref.set(post)
    this.router.navigate(['/profile/'+this.userId]);
  }
}