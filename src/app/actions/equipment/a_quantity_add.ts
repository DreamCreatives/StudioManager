import { ApiService } from "src/app/shared/services/apiService/api.service";
import { ViewService } from "src/app/shared/services/viewService/view.service";
import { WizardService } from "src/app/shared/services/wizardService/wizard.service";
import { switchMap, filter, tap, defaultIfEmpty, of } from "rxjs";
import { CID } from "src/app/shared/config/constants.json";

export function a_equipment_add_quantity(vs: ViewService, apis: ApiService, ws: WizardService) {
    return ws.create('addQuantity').pipe(
      tap(() => {
        ws.allowSave(() => {
          if (ws.getValue('quantity') === '') {
            vs.showToast('Quantity is reqired', 'warning');
            return false;
          }
          return true
        })
      }),
      switchMap(() => ws.destroy()),
      filter(wizardDestroyed => wizardDestroyed.save),
      switchMap(wizardDestroyed => apis.saveRecord(
          CID.EQUIPMENT,
          wizardDestroyed.savedFields,
           {}
      ) ),  
      tap(() => {
        vs.refresh();
      }),
      defaultIfEmpty(null)
    );
}