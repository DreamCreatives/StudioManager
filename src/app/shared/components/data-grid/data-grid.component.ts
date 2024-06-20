import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { ViewService } from '../../services/viewService/view.service';
import { ApiService } from '../../services/apiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { DataGridPaginationConfig, Equipment, EquipmentType } from '../../models/apiService.model';
import { LoginService } from '../../services/loginService/login.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})

export class DataGridComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private viewService: ViewService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
) { }

  public dataGridName = '';

  ngOnInit(): void {
    this.loginService.checkIfUserIsLogged();
    this.viewService.objID = [];
    this.route.data.pipe(
      switchMap(view => {
        return this.viewService.getDataGridConfig(view['viewID'])
      }),
      tap(dataGridConfig => {
        this.dataGridName = dataGridConfig.dataGridName;
      }),
      switchMap(dataGridConfig => 
        this.apiService.getDataGridData(dataGridConfig.getUrl).pipe(
          tap(response => {
            const data: (string)[][] = [];

            let dataHolder: DataGridPaginationConfig | EquipmentType[] | null;

            if (Object.prototype.hasOwnProperty.call(response, 'data') && response !== null) {
              const dataKey = 'data' as keyof typeof response;
              dataHolder = response[dataKey];
            } else {
              dataHolder = response;
            }
            

            for (const row in dataHolder) {
              const dataRow: (string )[] = [];
              const rowKey = row as keyof typeof dataHolder;

              for (const object in dataHolder[rowKey] as Equipment | EquipmentType) {
                if (dataGridConfig.dataGridFieldsNames.indexOf(object) > -1) {
                  const objectKey = object as keyof typeof dataHolder[typeof rowKey];
                  dataRow.push(this.isObject(dataHolder[rowKey][objectKey]) ? dataHolder[rowKey][objectKey]['name'] : dataHolder[rowKey][objectKey]);
                }
              }

              data.push(dataRow);
            }

            new DataTable('#dataGridTable', {
              data: {
                headings: dataGridConfig.headers,
                data: data
              },
              perPageSelect: [10, 25, 50]
            });

            const rows = document.querySelectorAll<HTMLTableRowElement>('#dataGridTable tr');

            rows.forEach(row => {
              row.addEventListener('dblclick', () => {
                this.redirecToEdit(dataGridConfig['reroutePath'], row.cells[0].textContent);
              });
            });

            rows.forEach(row => {
              row.addEventListener('click', (event) => {
                this.selectRow(row, event);
              });
            });
          })
        )
      )
    ).subscribe();    
  }

  unselectAllCells(): void {
    const cells = document.querySelectorAll<HTMLTableRowElement>('#dataGridTable td')
    cells.forEach(cell => {
      cell.style.background = 'white';
    })
  }

  selectRow(row: HTMLTableRowElement, event: MouseEvent): void {
    const cells = Array.from(row.cells);
    let isFirstCell = true;
    cells.forEach(cell => {
      if (isFirstCell) {
        if (event.ctrlKey && !this.viewService.objID.includes(String(cell.textContent))) {
          this.viewService.objID.push(String(cell.textContent));
        } else {
          this.unselectAllCells();
          this.viewService.objID = [String(cell.textContent)];
        }
        isFirstCell = false;
      }
      cell.style.background = 'lightgrey';
    })
  }

  isObject(value: unknown): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  redirecToEdit(reroutePath: string, objectID: string | null): void {
    if (objectID)
      this.router.navigate([reroutePath, objectID]);
  }
}
