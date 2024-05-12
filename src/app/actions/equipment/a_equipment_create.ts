import { ApiService } from "src/app/shared/services/apiService/api.service";
import { ViewService } from "src/app/shared/services/viewService/view.service";
import { WizardService } from "src/app/shared/services/wizardService/wizard.service";
import { switchMap, filter, tap, defaultIfEmpty } from "rxjs";

export function a_equipment_create(vs: ViewService, apis: ApiService, ws: WizardService) {
  return ws.create('addEquipmentList').pipe(
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