import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.css']
})
export class ErrorSnackbarComponent implements OnInit {

  constructor(private taskService: TasksService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.taskService.error$
      .subscribe(data => {
        if (data) {
          this.snackBar.open('Server Error', "Ok",{duration: 5000, panelClass: ['red-snackbar']})
        }
      })
  }


}
