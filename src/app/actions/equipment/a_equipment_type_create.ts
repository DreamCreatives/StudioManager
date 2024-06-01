import { ViewService } from "src/app/shared/services/viewService/view.service";
import { WizardService } from "src/app/shared/services/wizardService/wizard.service";
import { ApiService } from "src/app/shared/services/apiService/api.service";
import { switchMap, filter, tap, defaultIfEmpty } from "rxjs";
import { CID } from "src/app/shared/config/constants.json";
import { EquipmentType } from "src/app/shared/models/apiService.model";
import { HttpParams } from "@angular/common/http";

export function a_equipment_type_create(vs: ViewService, apis: ApiService, ws: WizardService) {
  return ws.create('addEquipmentTypeList').pipe(
    tap(() => {
      ws.allowSave(() => {
        if (ws.getValue('name') === '') {
          vs.showToast('Fill field Name', 'warning');
          return false;
        }
        return true;
      })
    }),
    switchMap(() => ws.destroy()),
    filter(wizardDestroyed => wizardDestroyed.save),
    switchMap(wizardDestroyed => 
      apis.saveRecord(
        CID.EQUIPMENT_TYPE,
        wizardDestroyed.savedFields as EquipmentType,
        new HttpParams
      )
    ),
    tap(() => {
      vs.refresh();
    }),
    defaultIfEmpty(null)
  );
}