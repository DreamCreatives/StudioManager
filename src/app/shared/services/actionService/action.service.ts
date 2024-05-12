import { Injectable } from '@angular/core';
import { WizardService } from '../wizardService/wizard.service';
import { YesNoService } from '../yesNoService/yes-no.service';
import { ApiService } from '../apiService/api.service';
import { ViewService } from '../viewService/view.service';
import { switchMap, of, tap, filter, defaultIfEmpty } from 'rxjs';
import { ToastService } from '../toastService/toast.service';

import {
  a_equipment_type_create,
  a_equipment_type_delete,
  a_equipment_create,
  a_equipment_delete
} from 'src/app/actions/equipment';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private wizardService: WizardService,
    private yesNoService: YesNoService,
    private apiService: ApiService,
    private viewService: ViewService,
    private toastService: ToastService,
  ) { }

  executeFunction(functionName: string) {
    (this as any)[functionName]().subscribe();
  }

  // EQUIPMENT TYPE
  createEquipmentType() { return a_equipment_type_create(this.viewService, this.apiService, this.wizardService) }
  deleteEquipmentType() { return a_equipment_type_delete(this.viewService, this.apiService, this.yesNoService) }

  // EQUIPMENT
  createEquipment() { return a_equipment_create(this.viewService, this.apiService, this.wizardService) }
  deleteEquipment() { return a_equipment_delete(this.viewService, this.apiService, this.yesNoService) }
}
