import { Component } from '@angular/core';
import { TasksApi } from 'src/app/services/tasks.service';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent {
  tasks: ITask[] = [];
  loading = false;

  constructor(
    private tasksApi: TasksApi
    ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.tasksApi.getTasks().subscribe((tasks) => {
      this.tasks = tasks.sort((x:any, y:any) => {
        return x.date - y.date
      }).reverse();
      this.loading = false;
      console.log(tasks)
    })
  }

}
