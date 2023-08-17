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

    ngOnInit(): void {
      this.data = this.currentTaskService.getCurrentTask();
    }

    public closeEditor() {
      this.router.navigate(['main']);
    }

    submit() {
      let id = this.data?.id
      this.taskApi.editTask({
        task: this.form.value.task as string,
        img: this.form.value.img as string,
        date: this.data?.date as any
      }, id)
      console.log(this.form.value)
      this.closeEditor();
    }

}
