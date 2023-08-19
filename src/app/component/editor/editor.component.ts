import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { CurrentTaskService } from 'src/app/services/current-task.service';
import { TasksApi } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  public data:ITask | null = null;

  constructor(
    private router: Router,
    private currentTaskService: CurrentTaskService,
    private taskApi: TasksApi
    ) {}

    form = new FormGroup({
      task: new FormControl<string>('' ,[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000)
      ]),
      img: new FormControl<string>('', [
        Validators.required,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      ]),
      id: new FormControl<any>(this.data?.id)
    })

    get task() {
      return this.form.controls.task as FormControl
    }

    get img() {
      return this.form.controls.img as FormControl
    }

  // форма для редактирования задачи с тремя переменными, две из которых с отслеживаются в реальном времени и валидируются

    ngOnInit(): void {
      this.data = this.currentTaskService.getCurrentTask();
    }

    // функция получения и записи данных о выбранной задаче

    closeEditor() {
      this.router.navigate(['main']);
    }

    // функция закрытия страницы редактирования и возвращения на главную

    submit() {
      let id = this.data?.id
      this.taskApi.editTask({
        task: this.form.value.task as string,
        img: this.form.value.img as string,
        date: this.data?.date as any
      }, id)
      this.closeEditor();
    }

    // функция отправки формы

}

// компонент, что отвечает за страницу редактирования задачи
