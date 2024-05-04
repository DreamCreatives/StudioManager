import { Component } from '@angular/core';
import { ViewService } from '../../services/viewService/view.service';
import { ActivatedRoute } from '@angular/router';
import { Action } from '../../models/view.models';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})

export class ActionBarComponent {
  constructor(private viewService: ViewService, private route: ActivatedRoute) { }
  
  public actionsList: Action[] = [];
  private viewID = '';

  ngOnInit() {
    this.route.data.subscribe(view => {
      this.viewID = view['viewID'];
    });

    const actionsConfig = this.viewService.getActionsConfig(this.viewID);
    
    this.actionsList = actionsConfig.actions;
  }
}
