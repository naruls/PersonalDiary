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

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { InfiniteScrollModule } from "ngx-infinite-scroll"

import { TasksApi } from './services/tasks.service';
import { PopupComponent } from './component/popup/popup.component';
import { EditorComponent } from './component/editor/editor.component';
import { LoginComponent } from './component/login/login.component';

// Подключение всех необходимых для работы spa компонентов/модулей/сервисов

const firebaseConfig = {
  apiKey: "AIzaSyDJ3izSaco9eztpsQ_IEBGglgzRsQNf0wk",
  authDomain: "personaldialy.firebaseapp.com",
  projectId: "personaldialy",
  storageBucket: "personaldialy.appspot.com",
  messagingSenderId: "971341411499",
  appId: "1:971341411499:web:7394c509db3fb9e55cf3ee",
  measurementId: "G-H9J91Z4PKT"
};

// Конфиг для работы с firebase

@NgModule({
  declarations: [
    AppComponent,
    DiaryComponent,
    TaskComponent,
    HeaderComponent,
    GetErrorComponent,
    PopupComponent,
    EditorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    InfiniteScrollModule
  ],
  providers: [TasksApi],
  bootstrap: [AppComponent]
})

export class AppModule { }
