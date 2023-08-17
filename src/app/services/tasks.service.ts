import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData, addDoc, updateDoc, doc, deleteDoc } from "@angular/fire/firestore";
import { ITask } from "../models/task";
import {Observable, catchError, throwError} from 'rxjs';
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
  getTasks() : Observable<any> {
    let taskCollection = collection(this.fs, 'tasks');
    return (collectionData(taskCollection, {idField:'id'}))
    .pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  createTask(task: ITask) {
    let newTasks = collection(this.fs, 'tasks');
    return (addDoc(newTasks, task));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message)
  }

  deleteTask(id:string) {
    let idRef=doc(this.fs, 'tasks/'+id);
    return deleteDoc(idRef)
  }

  editTask(task: ITask, id:any) {
    let newTasks = collection(this.fs, 'tasks');
    return (updateDoc(doc(newTasks, id), {
      task: task.task,
      img: task.img,
      date: task.date
    }))
  }

}

