import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SelectorComponent } from './components/selector/selector.component';
import { MomentPipe } from './pipes/moment.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';
import { OrganizerComponent } from './components/organizer/organizer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    MomentPipe,
    CalendarComponent,
    OrganizerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
