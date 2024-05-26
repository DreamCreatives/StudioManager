import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { ViewService } from '../../services/viewService/view.service';
import { ApiService } from '../../services/apiService/api.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CID } from '../../config/constants.json';
import { CalendarReservation } from '../../models/calendar.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  constructor(
    private viewService: ViewService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public events: CalendarReservation[] = [];
  public calendarApi: any;
  public calendarName: string = '';
  public reroutePath: string = '';
  public firstDayOfMonth: string = '';
  public lastDayOfMonth: string = '';

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    eventClick: (arg) => this.handelEventClick(arg),
    events: this.events,
    eventDidMount: this.handleEventDidMount.bind(this)
  };

  ngOnInit(): void {
    this.getFirstAndLastDayOfMonth();
    this.viewService.objID = null;
    this.route.data.pipe(
      switchMap(view => this.viewService.getCalendarConfig(view['viewID'])),
      tap(calendarConfig => {
        this.calendarName = calendarConfig.calendarName;
        this.reroutePath = calendarConfig.reroutePath;
      }),
      switchMap(calendarConfig => {
        return this.apiService.getCalendarDataByDate(
          calendarConfig.getUrl,
          { startDate: this.firstDayOfMonth, endDate: this.lastDayOfMonth }
        );
      }),
      tap(response => {
        const dataKey = "data" as keyof typeof response;
        const eventsData = response[dataKey];

        for (const event in response[dataKey]) {
          const eventKey = event as keyof typeof eventsData;
          this.events.push({
            id: eventsData[eventKey]['id'],
            title: eventsData[eventKey]['equipment']['name'],
            start: eventsData[eventKey]['startDate'],
            end: eventsData[eventKey]['endDate'],
            editable: true
          });
        }
      })
    ).subscribe();
  }
  
  handelEventClick(event: any): void {
    this.viewService.objID = event.event._def.publicId;
  }

  handleEventDidMount(info: any): void {
    info.el.addEventListener('dblclick', () => {
      this.router.navigate([this.reroutePath, this.viewService.objID]);
    });
  }

  getFirstAndLastDayOfMonth(): void {
    const now = new Date();
    this.firstDayOfMonth = this.formatDateToYYYYMMDD(new Date(now.getFullYear(), 0, 1));
    this.lastDayOfMonth = this.formatDateToYYYYMMDD(new Date(now.getFullYear(), 11, 31));
  }

  formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
