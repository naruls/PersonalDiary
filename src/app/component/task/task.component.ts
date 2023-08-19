import {Component, Input} from '@angular/core';
import { ITask } from '../../models/task';
import { Router } from '@angular/router';
import { CurrentTaskService } from 'src/app/services/current-task.service';
import { TasksApi } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})

export class TaskComponent {
  @Input() task: ITask

  constructor(
    private router: Router,
    private currentTaskService: CurrentTaskService,
    private taskApi: TasksApi
    ) {}

  openEditor(task: ITask) {
    this.router.navigate(['task-editor']);
    this.currentTaskService.setCurrentTask(task);
  }

  // функция, что отвечает за открытие окна редактирования выбранной задачи

  deleteTask(id: any) {
    this.taskApi.deleteTask(id).then((res)=>{
    })
  }

  // функция, что отвечает за удаление выбранной задачи

}

// компонент, что отвечает за одну задачу
