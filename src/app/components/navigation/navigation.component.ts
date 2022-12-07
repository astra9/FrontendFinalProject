import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public toggle: boolean=false;

  constructor() { }

  ngOnInit(): void {
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
    //placeholder
  }
}
