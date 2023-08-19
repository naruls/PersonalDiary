import { Component, OnInit } from '@angular/core';
import { TasksApi } from 'src/app/services/tasks.service';
import { ITask } from 'src/app/models/task';
import { LazyLoadService } from 'src/app/services/lazy-load.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  tasks: ITask[] = [];
  data: ITask[] = [];
  loading = false;
  currentPage=1;
  itemsPerPage=4;

  constructor(
    private tasksApi: TasksApi,
    private lazyLoadService: LazyLoadService
    ) {
  }

  fetchData() {
    this.loading = true;
    this.tasksApi.getTasks().subscribe((data:any) => {
      this.data = data.sort((x:any, y:any) => {
        return x.date - y.date
      }).reverse();
      this.loadData()
    })
  }

  // функция, что получает данные с firebase и записывает их в переменную

  loadData() {
    this.lazyLoadService.getItems(1, this.itemsPerPage, this.data)
    .subscribe((res) => {
      this.tasks = res;
      this.loading = false;
      this.currentPage = 1;
    })
  }

    // функция, что отвечает за подгрузку данных в момент обновления страницы или посещения её

  ngOnInit(): void {
    this.fetchData();
  }

  // функция, что запускает fetchData каждый раз при посещении страницы или изменении данных в firebase

  appendData() {
    this.loading = true;
    this.lazyLoadService.getItems(this.currentPage, this.itemsPerPage, this.data)
    .subscribe((res) => {
      this.tasks = [...this.tasks,...res]
      this.loading = false;
    })
  }

      // функция, что отвечает за добовление на страницу новых данных при скролле страницы

  onScroll() {
    this.currentPage++;
    this.appendData();
  }

   // функция, что отслеживает скролл

}
