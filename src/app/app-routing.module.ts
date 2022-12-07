import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component'; 
import { RegistrationComponent } from './components/registration/registration.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo: "/signin"},
  {path:"signin", component: SigninComponent},
  {path:"register", component: RegistrationComponent},
  {path:"chat", canActivate: [AuthGuard], component:ChatComponent },
  {path:"**", redirectTo:"/signin"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

