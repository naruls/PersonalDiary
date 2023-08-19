import { Injectable } from '@angular/core';
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class CurrentTaskService {

  private currentTask: ITask | null = null;

  constructor() { }

  public setCurrentTask(task:ITask) {
    this.currentTask = task;
  }

  public getCurrentTask(): ITask | null {
    return this.currentTask;
  }

}

// сервис для получения всех данных выбранной для редактирования задачи
