import { ApiService } from "src/app/shared/services/apiService/api.service";
import { ViewService } from "src/app/shared/services/viewService/view.service";
import { WizardService } from "src/app/shared/services/wizardService/wizard.service";
import { switchMap, filter, tap, defaultIfEmpty } from "rxjs";

export function a_equipment_create(vs: ViewService, apis: ApiService, ws: WizardService) {
  return ws.create('addEquipmentList').pipe(
    tap(() => {
      ws.allowSave(() => {
        if (ws.getValue('name') === '') {
          vs.showToast('Fill field Name', 'warning');
          return false;
        } else if(ws.getValue('quantity') === '') {
          vs.showToast('Fill field Quantity', 'warning');
          return false;
        } else if(ws.getValue('equipmentTypeId') === '') {
          vs.showToast('Fill field Equipment Type', 'warning');
          return false;
        }
        return true;
      })
    }),
    switchMap(() => ws.destroy()),
    filter(wizardDestroyed => wizardDestroyed.save),
    switchMap(wizardDestroyed => apis.saveWizard(
        'http://localhost:5001/api/v1/Equipments',
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