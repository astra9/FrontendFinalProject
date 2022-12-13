import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup = new FormGroup({
    firstName:  new FormControl("", {
        validators: [Validators.required, Validators.minLength(3)]
    }),
    lastName: new FormControl("", { validators: [Validators.required, Validators.minLength(3)] }),
    email: new FormControl("", {validators: [Validators.required, Validators.email]}),
    password:  new FormControl("", {validators:[Validators.required, Validators.minLength(8)]})
  });
  private subscriptions: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private route: Router) {  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>{
        sub.unsubscribe();
      })
  }

  public submitForm(): void{
    if(this.registerForm.valid){
      const {firstName, lastName, email, password} = this.registerForm.value;
      this.subscriptions.push(
        this.auth.signUp(firstName, lastName, email, password).subscribe(success=>{
          if(success){
            this.route.navigate(['chat']);
          } else {
          
          }
        })
      )
    } 
  }
  
}
