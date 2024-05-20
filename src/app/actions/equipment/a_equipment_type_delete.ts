import { ViewService } from "src/app/shared/services/viewService/view.service";
import { ApiService } from "src/app/shared/services/apiService/api.service";
import { YesNoService } from "src/app/shared/services/yesNoService/yes-no.service";
import { switchMap, filter, tap, defaultIfEmpty, of } from "rxjs";
import { CID } from "src/app/shared/config/constants.json";

export function a_equipment_type_delete(vs: ViewService, apis: ApiService, yesnos: YesNoService) {
    return of(vs.objID).pipe(
        filter(objID => objID !== null),
        switchMap(() => yesnos.run('Are you sure?')),
        filter(response => response),
        switchMap(() => {
          return apis.deleteRecord(
            CID.EQUIPMENT_TYPE,
            String(vs.objID)
          );
        }),
        tap(() => {
            vs.refresh();
        }),
        defaultIfEmpty(null)
      );
}