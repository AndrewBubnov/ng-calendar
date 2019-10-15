import {Component, OnInit} from '@angular/core';
import {DateService} from '../../services/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TasksService} from '../../services/task.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup
  tasks: Task[] = []

  constructor(private dateService: DateService,
              private tasksService: TasksService) {
  }

  ngOnInit() {
    this.dateService.date$.pipe(
      switchMap(value => this.tasksService.loadTasks(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value

    const task: Task = {
      title,
      date: this.dateService.date$.value.format('DD-MM-YYYY')
    }

    this.tasksService.createTask(task).subscribe(task => {
      this.tasks.push(task)
      this.form.reset()
    }, err => console.error(err))
  }

  remove(task: Task) {
    this.tasksService.removeTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => console.error(err))
  }

}
