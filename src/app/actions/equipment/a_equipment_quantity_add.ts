import { ApiService } from "src/app/shared/services/apiService/api.service";
import { ViewService } from "src/app/shared/services/viewService/view.service";
import { WizardService } from "src/app/shared/services/wizardService/wizard.service";
import { switchMap, filter, tap, defaultIfEmpty, of } from "rxjs";
import { CID } from "src/app/shared/config/constants.json";
import { HttpParams } from "@angular/common/http";
import { Equipment } from "src/app/shared/models/apiService.model";

export function a_equipment_add_quantity(vs: ViewService, apis: ApiService, ws: WizardService) {
  return of(vs.objID).pipe(
    filter(objID => objID !== null),
    switchMap(() => { return ws.create('addQuantity');}),
    tap(() => {
      ws.allowSave(() => {
        if (ws.getValue('quantity') === '') {
          vs.showToast('Quantity is reqired', 'warning');
          return false;
        }
       return true;
      })
    }),
    switchMap(() => ws.destroy()),
    filter(wizardDestroyed => wizardDestroyed.save),
    switchMap(wizardDestroyed => {
      const params = new HttpParams();
      return apis.getEditObjectByID(CID.EQUIPMENT, params, String(vs.objID)).pipe(
        switchMap(response => {
          return apis.saveRecord(
            CID.EQUIPMENT,
            response as Equipment,
            new HttpParams,
            String(vs.objID)
            )
        })
        );
    }),
    tap(() => {
      vs.refresh();
    }),
    defaultIfEmpty(null)
    
  );
}
