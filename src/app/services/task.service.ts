import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import * as moment from 'moment';

export interface Task {
  id?: string
  title: string
  date?: string
  index?: string
}

interface CreateResponse {
  name: string
}

@Injectable({providedIn: 'root'})
export class TasksService {
  static url = 'https://ng-calendar-c73fc.firebaseio.com/tasks';
  static indexUrl = 'https://ng-calendar-c73fc.firebaseio.com/index';
  public tasked$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public error$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  loadTasks(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map(tasks => {
          if (!tasks) {
            return [];
          }
          return Object.keys(tasks).map(key => ({...tasks[key], id: key}));
        })
      );
  }

  createTask(task: Task) {
    const { date } = task
    return this.http.post<CreateResponse>(`${TasksService.indexUrl}.json`, { date }).pipe(
      switchMap(data => {
        task.index = data.name;
        return this.http
          .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
          .pipe(map(res => {
            const tasked = this.tasked$.value
            tasked.push(task.date)
            this.tasked$.next(tasked)
            return {...task, id: res.name}
          }))
      })
    )
  }


  getIndexed = () => {
    return this.http.get(`${TasksService.indexUrl}.json`).subscribe(data => {
      if (data) {
        const tasked = Object.values(data).map(item => item.date)
        this.tasked$.next(tasked);
      }
    })
  };


  removeTask(task: Task): Observable<void> {
    return this.http.delete<void>(`${TasksService.indexUrl}/${task.index}.json`)
      .pipe(
        switchMap(() => {
          let tasked = this.tasked$.value;
          tasked.splice(tasked.indexOf(task.date), 1);
          this.tasked$.next(tasked);
          return this.http
            .delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
        })
      )
  }

}
