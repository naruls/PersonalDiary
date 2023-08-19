import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData, addDoc, updateDoc, doc, deleteDoc } from "@angular/fire/firestore";
import { ITask } from "../models/task";
import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class TasksApi {
  constructor(
      private fs: Firestore,
      private errorService: ErrorService,
    ) {
  }

  // сервис, что вобрал в себя всё взаимодействие с api firebase

  getTasks() : Observable<any> {
    const emailUser = localStorage.getItem("email");
    let taskCollection = collection(this.fs, `tasks${emailUser}`);
    return (collectionData(taskCollection, {idField:'id'}))
    .pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

// функция, для получения всех записей пользователя

  createTask(task: ITask) {
    const emailUser = localStorage.getItem("email");
    let newTasks = collection(this.fs, `tasks${emailUser}`);
    return (addDoc(newTasks, task)).catch((err)=>{
      console.log(err)
    });
  }

  // функция, для создания новой записи пользователя

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message)
  }

  // функция, возращающая ошибку в случае не обработки get запроса

  deleteTask(id:string) {
    const emailUser = localStorage.getItem("email");
    let idRef=doc(this.fs, `tasks${emailUser}/`+id);
    return deleteDoc(idRef).catch((err)=> {
      console.log(err)
    })
  }

  // функция, для удаления записи пользователя

  editTask(task: ITask, id:any) {
    const emailUser = localStorage.getItem("email");
    let newTasks = collection(this.fs, `tasks${emailUser}`);
    return (updateDoc(doc(newTasks, id), {
      task: task.task,
      img: task.img,
      date: task.date
    })).catch((err)=> {
      console.log(err)
    })
  }

  // функция для редактирования записи пользователя

}

