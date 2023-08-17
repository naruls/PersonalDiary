import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiaryComponent } from './component/diary/diary.component';
import { HeaderComponent } from './component/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { GetErrorComponent } from './component/get-error/get-error.component';
import { TaskComponent } from './component/task/task.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { TasksApi } from './services/tasks.service';
import { PopupComponent } from './component/popup/popup.component';
import { EditorComponent } from './component/editor/editor.component';

const firebaseConfig = {
  apiKey: "AIzaSyDJ3izSaco9eztpsQ_IEBGglgzRsQNf0wk",
  authDomain: "personaldialy.firebaseapp.com",
  projectId: "personaldialy",
  storageBucket: "personaldialy.appspot.com",
  messagingSenderId: "971341411499",
  appId: "1:971341411499:web:7394c509db3fb9e55cf3ee",
  measurementId: "G-H9J91Z4PKT"
};

@NgModule({
  declarations: [
    AppComponent,
    DiaryComponent,
    TaskComponent,
    HeaderComponent,
    GetErrorComponent,
    PopupComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TasksApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
