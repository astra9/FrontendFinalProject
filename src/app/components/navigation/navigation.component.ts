import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  public toggle: boolean=false;
  public currentUser: any = null;
  public subscriptions: Subscription[]=[]

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.auth.currentUser.subscribe(user=>{
        this.currentUser=user
      })
    )
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe())
  }

  switchToggle(){
    this.toggle= !this.toggle;
  }

  toggleMenu(): string{
    if(this.toggle){
      return "collapse color-nav-menu navbar-collapse show"
    } else{
      return "collapse navbar-collapse"
    }
  }

  public logout(){
    this.auth.logout();
  }
}
