import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../services/viewService/view.service';
import { ActionService } from '../../services/actionService/action.service';
import { ActivatedRoute } from '@angular/router';
import { Action } from '../../models/view.models';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})

export class ActionBarComponent implements OnInit {
  constructor(
    private viewService: ViewService,
    private actionService: ActionService,
    private route: ActivatedRoute
  ) { }

  public actionsList: Action[] = [];
  private viewID = '';

  ngOnInit(): void {
    this.route.data.pipe(
      tap(view => { this.viewID = view['viewID'] }),
      switchMap(view => this.viewService.getActionsConfig(view['viewID'])),
      tap(actionsConfig => { this.actionsList = actionsConfig.actions })
    ).subscribe();
  }

  executeFunction(functionName: string): void {
    this.actionService.executeFunction(functionName);
  }
}
