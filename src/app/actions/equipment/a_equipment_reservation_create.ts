import { ApiService } from "src/app/shared/services/apiService/api.service";
import { ViewService } from "src/app/shared/services/viewService/view.service";
import { WizardService } from "src/app/shared/services/wizardService/wizard.service";
import { switchMap, of, tap, filter, defaultIfEmpty } from "rxjs";
import { CID } from "src/app/shared/config/constants.json";

export function a_equipment_reservation_create(vs: ViewService, apis: ApiService, ws: WizardService ) {
  return ws.create('addEquipmentReservation').pipe(
    tap(() => {
      ws.allowSave(() => {
        if (ws.getValue('equipment') === '') {
          vs.showToast('Fill field Equipment', 'warning');
          return false;
        } else if (ws.getValue('startDate') === '') {
          vs.showToast('Fill field Start Date', 'warning');
          return false;
        } else if (ws.getValue('endDate') === '') {
          vs.showToast('Fill field End Date', 'warning');
          return false;
        } else if (ws.getValue('quantity') === '') {
          vs.showToast('Fill field Quantity', 'warning');
          return false;
        }
        return true;
      })
    }),
    switchMap(() => ws.destroy()),
    filter(wizardDestroyed => wizardDestroyed.save),
    switchMap(wizardDestroyed => apis.saveRecord(
      CID.EQUIPMENT_RESERVATION,
      wizardDestroyed.savedFields,
      {}
    )
  ),
    tap(() => {
      vs.refresh();
    }),
    defaultIfEmpty(null)
  );
}