import { Component } from '@angular/core';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {

  constructor(private dateService: DateService) { }

  changeMonth = (direction: number) => {
    this.dateService.changeMonth(direction);
  }

}
