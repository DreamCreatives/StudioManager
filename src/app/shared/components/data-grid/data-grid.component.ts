import { Component } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { ViewService } from '../../services/viewService/view.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})

export class DataGridComponent {
  public dataGridName = '';
  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    const dataGridConfig = this.viewService.getDataGridConfig('equipmentList');

    this.dataGridName = dataGridConfig['dataGridName'];
    const dataTable = new DataTable('#dataGridTable', {
      caption: 'Testing caption',
      data: {
        headings: dataGridConfig.headers,
        data: [[1, 'test'], [2, 'test'], [3, 'test'], [4, 'test']]
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
}
