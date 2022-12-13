import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component'; 
import { RegistrationComponent } from './components/registration/registration.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateChatComponent } from './components/create-chat/create-chat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AddPostComponent } from './components/add-post/add-post.component';

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo: "/signin"},
  {path:"signin", component: SigninComponent},
  {path:"register", component: RegistrationComponent},
  {path:"chat",  canActivate: [AuthGuard],
    children: [
      {path:'', component: ChatComponent},
      {path:':chatroomId', component: ChatComponent}
    ]
  },
  {path:"create-chat", canActivate: [AuthGuard], component: CreateChatComponent},
  {path:"profile/:userId", canActivate: [AuthGuard], component: ProfileComponent},
  {path:"edit/:userId", canActivate: [AuthGuard], component: EditProfileComponent},
  {path:"add-post/:userId", canActivate: [AuthGuard], component: AddPostComponent},
  {path:"**", redirectTo:"/signin"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

