import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatroomAreaComponent } from './components/chat/chatroom-area/chatroom-area.component';
import { ChatroomsComponent } from './components/chat/chatrooms/chatrooms.component';
import { MessagingServiceService } from './services/messaging-service.service';
import { CreateChatComponent } from './components/create-chat/create-chat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ErrorHelperPipe } from './pipes/error-helper.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    NavigationComponent,
    SigninComponent,
    RegistrationComponent,
    ChatroomAreaComponent,
    ChatroomsComponent,
    CreateChatComponent,
    ProfileComponent,
    EditProfileComponent,
    AddPostComponent,
    ErrorHelperPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule, 
    AngularFireAuthModule, 
  ],
  providers: [
    AuthService,
    MessagingServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
