import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  
  public signInForm: FormGroup = new FormGroup({
    email:  new FormControl("", {validators: [Validators.required, Validators.email]}),
    password:  new FormControl("", {validators:[Validators.required, Validators.minLength(8)]})
  });
  private subscriptions: Subscription[]=[];
  private redirectUrl: string="";
  public displayFailedSignIn=false;
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    if(this.route.snapshot.queryParams["redirectUrl"]){
      this.redirectUrl=this.route.snapshot.queryParams["redirectUrl"]
    } else{
      this.redirectUrl='/chat';
    }
    this.auth.currentUser.subscribe(user=>{
      if(user){
        this.router.navigateByUrl(this.redirectUrl)
      }
    })
  }

  public async submitForm(): Promise<void>{
    if(this.signInForm.valid){
      let resolvedPromise = await this.auth.login(
        this.signInForm.value.email,
        this.signInForm.value.password
      )
      this.subscriptions.push(
        resolvedPromise.subscribe(success => {
          if(success){
            this.router.navigateByUrl(this.redirectUrl);
            this.displayFailedSignIn=false;
          } else{
            this.failedSignIn();
          }
        })
      )
    } 
    
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe);
  }

  failedSignIn(){
    this.displayFailedSignIn=true;
  }
}
