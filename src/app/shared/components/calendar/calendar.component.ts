import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    eventClick: (arg) => this.eventClickHandle(arg),
    events: [
      { title: 'event 1', date: '2024-05-01' },
      { title: 'event 2', date: '2024-05-02' },
      { title: 'test event', start: '2024-05-07', end: '2024-05-07', id: 'testID', editable: true },
    ]
  };

  eventClickHandle(event: any){
    console.log(event.event._def);
  }
}
