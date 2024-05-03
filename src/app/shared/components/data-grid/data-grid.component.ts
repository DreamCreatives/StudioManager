import { Component } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { ViewService } from '../../services/viewService/view.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, Observable, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})

export class DataGridComponent {
  public dataGridName = '';
  public viewID = ''
  constructor(private viewService: ViewService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const viewID = this.route.data.subscribe(view => {
      this.viewID = view['viewID'];
    });

    const dataGridConfig = this.viewService.getDataGridConfig(this.viewID);

    this.dataGridName = dataGridConfig['dataGridName'];
    const dataTable = new DataTable('#dataGridTable', {
      data: {
        headings: dataGridConfig.headers,
        data: dataGridConfig.data
      },
      perPageSelect: [10, 25, 50]
    });
    
    const rows = document.querySelectorAll<HTMLTableRowElement>('#dataGridTable tr');

    rows.forEach(row => {
      row.addEventListener('dblclick', () => {
        console.log('open edition');
        console.log(row.cells[0].textContent)
      });
    });

    rows.forEach(row => {
      row.addEventListener('click', () => {
        console.log(row.cells[0].textContent);
        this.unselectAllCells();
        this.selectRow(row);
      });
    });
  }

  unselectAllCells(): void {
    const cells = document.querySelectorAll<HTMLTableRowElement>('#dataGridTable td')
    cells.forEach(cell => {
      cell.style.background = 'white';
    })
  }

  selectRow(row: HTMLTableRowElement) {
    const cells = Array.from(row.cells);
    cells.forEach(cell => {
      cell.style.background = 'lightgrey';
    })
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
}
