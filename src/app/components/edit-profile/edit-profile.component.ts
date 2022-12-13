import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/data/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseDB: AngularFirestore) { 
      this.editForm = this.formBuilder.group({
        firstName:[this.userToEdit.firstName,[Validators.required, Validators.minLength(3)]],
        lastName:[this.userToEdit.lastName,[Validators.required, Validators.minLength(3)]],
        email: [this.userToEdit.email, [Validators.required, Validators.email]],
        aboutMe: [this.userToEdit.aboutMe, [Validators.required, Validators.minLength(8)]]
      })
      

      this.subscriptions.push(
        this.route.paramMap.subscribe(params => {
          const userId = params.get('userId');
          const userRef: AngularFirestoreDocument<User> = this.firebaseDB.doc(`users/${userId}`)
          userRef.valueChanges().subscribe(user=>{
            if(user !== undefined){
              this.userToEdit=user
            }
            this.editForm = new FormGroup({
              firstName:  new FormControl(this.userToEdit.firstName, {
                  validators: [Validators.required, Validators.minLength(3)]
              }),
              lastName: new FormControl(this.userToEdit.lastName, { validators: [Validators.required, Validators.minLength(3)] }),
              aboutMe:  new FormControl(this.userToEdit.aboutMe, {validators:[Validators.required, Validators.minLength(8)]})
            });
          })
        })
      )
  }

  public editForm!: FormGroup;
  public userToEdit: User = new User("","","","","","");
  private subscriptions: Subscription[] =[]

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub=>sub.unsubscribe())
  }

  public submitForm(): void{
    if(this.editForm.valid){
      const {firstName, lastName, aboutMe} = this.editForm.value
      this.firebaseDB.collection('users').doc(this.userToEdit?.id).update(
        {firstName, lastName, aboutMe}
      )
      this.router.navigate([`profile/${this.userToEdit?.id}`]);
    } else{
    
    }
  }

}
