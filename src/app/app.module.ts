import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SelectorComponent } from './components/selector/selector.component';
import { MomentPipe } from './pipes/moment.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';
import { OrganizerComponent } from './components/organizer/organizer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ErrorSnackbarComponent } from './components/error-snackbar/error-snackbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    MomentPipe,
    CalendarComponent,
    OrganizerComponent,
    ErrorSnackbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
