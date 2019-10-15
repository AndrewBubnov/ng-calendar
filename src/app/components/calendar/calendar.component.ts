import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../../services/date.service';
import { TasksService } from '../../services/task.service';

interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
  tasked: boolean
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private calendar: Week[];
  private month: number;

  constructor(private dateService: DateService, private taskService: TasksService) {
  }

  ngOnInit() {
    this.dateService.date$.subscribe(() => {
      if (this.dateService.date$.value.month() !== this.month){
        this.month = this.dateService.date$.value.month();
        this.generateCalendar(this.dateService.date$.value);
        this.taskService.getIndexed()
      } else {
        this.reSelectDay(this.dateService.date$.value.format('DD-MM-YYYY'));
      }
    });
    this.taskService.tasked$.subscribe(this.getTasked)
  }

  reSelectDay = (day: string) => {
    this.calendar.forEach(week => {
      week.days.forEach(item => {
        const currentDate = item.value.format('DD-MM-YYYY');
        item.selected = (day === currentDate)
      })
    })
  };

  generateCalendar = (currentDay: moment.Moment) => {
    const firstDay = currentDay.clone().startOf('month').startOf('week');
    const lastDay = currentDay.clone().endOf('month').endOf('week');
    const date = firstDay.clone().subtract(1, 'day');
    const calendar = [];
    while (date.isBefore(lastDay)){
      calendar.push({
        days: Array.from({length: 7},
          () => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !currentDay.isSame(value, 'month');
            const selected = currentDay.isSame(value, 'day');
            return {value, active, disabled, selected}
          })
      })
    }
    this.calendar = calendar;
  };

  onSelect = (day) => {
    if (!day.disabled){
      this.dateService.selectDate(day.value);
    }
  };

  getTasked = () => {
    const datesWithTasks = this.taskService.tasked$.value;
    this.calendar.forEach(week => {
      week.days.forEach(item => {
        const currentDate = item.value.format('DD-MM-YYYY');
        item.tasked = datesWithTasks.includes(currentDate);
      });
    });
  };





}
