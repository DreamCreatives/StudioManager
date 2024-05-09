import { Component } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { ViewService } from '../../services/viewService/view.service';
import { ApiService } from '../../services/apiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})

export class DataGridComponent {
  constructor(
    private viewService: ViewService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
) { }

  public dataGridName = '';

  ngOnInit(): void {
    this.viewService.objID = null;
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

            for (const row in response) {
              const dataRow: (string )[] = [];
              const rowKey = row as keyof typeof response;
              
              for (const object in response[rowKey]) {
                const objectKey = object as keyof typeof response[typeof rowKey];
                dataRow.push(response[rowKey][objectKey]);
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
                this.rerouteToEdit(dataGridConfig['reroutePath'], row.cells[0].textContent);
              });
            });

            rows.forEach(row => {
              row.addEventListener('click', () => {
                this.unselectAllCells();
                this.selectRow(row);
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

  selectRow(row: HTMLTableRowElement): void {
    const cells = Array.from(row.cells);
    let isFirstCell = true;
    cells.forEach(cell => {
      if (isFirstCell) {
        this.viewService.objID = cell.textContent;
        isFirstCell = false;
      }
      cell.style.background = 'lightgrey';
    })
  }

  rerouteToEdit(reroutePath: string, objectID: string | null): void {
    if (objectID)
      this.router.navigate([reroutePath, objectID]);
  }
}
