import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupService } from 'src/app/services/popup.service';
import { TasksApi } from 'src/app/services/tasks.service';
import { Timestamp } from "@angular/fire/firestore";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  constructor(
    public popupService: PopupService,
    private tasksApi: TasksApi
    ) {}

  form = new FormGroup({
    task: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(1000)
    ]),
    img: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    ]),
    date: new FormControl(Timestamp.fromDate(new Date())),
  })

  get task() {
    return this.form.controls.task as FormControl
  }

  get img() {
    return this.form.controls.img as FormControl
  }

  submit() {
    this.tasksApi.createTask({
      task: this.form.value.task as string,
      img: this.form.value.img as string,
      date: this.form.value.date as Timestamp
    })
    this.popupService.close()
  }
}
