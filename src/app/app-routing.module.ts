import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './component/diary/diary.component';
import { EditorComponent } from './component/editor/editor.component';
import { LoginComponent } from './component/login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: DiaryComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'task-editor', component: EditorComponent },
  { path: 'login', component: LoginComponent}
];

// настройка путей и редиректов при переходе по умолчанию, на пути main настройка защиты от перехода при отсутствии авторизации пользователя

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
