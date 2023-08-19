import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs'
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadService {

  getItems(page:number, itemsPerPage:number, data:ITask[]):Observable<any>{
    const totalItems = data.length;
    const startIndex=(page-1)*itemsPerPage;
    const endIndex=startIndex+itemsPerPage;
    const items=[];
    for(let i=startIndex; i<endIndex; i++) {
      if(i<totalItems) {
        items.push(data[i]);
      }
    }
    return of(items).pipe(delay(500));
  }

  constructor() { }
}

// сервис, что отвечает за основную функцию lazy load
