import { Timestamp } from "@angular/fire/firestore";

export interface ITask {
  id?: number,
  date: Timestamp,
  task: string,
  img: string
}


// модель для задачи
