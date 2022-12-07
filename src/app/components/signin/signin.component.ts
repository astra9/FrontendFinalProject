import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.signInForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {
    this.redirectUrl=this.route.snapshot.queryParams["redirectUrl"] || '/chat';
  }

  public signInForm: FormGroup;
  private subscriptions: Subscription[]=[];
  private redirectUrl: string="";

  public submitForm(): void{
    if(this.signInForm.valid){
      const {email, password} = this.signInForm.value;
      this.subscriptions.push(
        this.auth.login(email,password).subscribe(success => {
          if(success){
            this.router.navigateByUrl(this.redirectUrl);
          } else{
            this.failedSignIn();
          }
        })
      )
    } else{
      this.failedSignIn();
    }
    
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe);
  }

  failedSignIn(){
    console.log("failed signIn");
  }
}
