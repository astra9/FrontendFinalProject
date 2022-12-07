import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthService,
    private route: Router) { 
    this.registerForm = this.formBuilder.group({
      firstName:["", [Validators.required]],
      lastName:["",[Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>{
        sub.unsubscribe();
      })
  }

  public registerForm: FormGroup;
  private subscriptions: Subscription[] = [];

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
    } else{
    
    }
  }
}
