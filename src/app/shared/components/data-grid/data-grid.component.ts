import { Component } from '@angular/core';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent {
  ngOnInit(): void {
    let dataTable = new DataTable('#myTable', {
      data: {
        headings: ['test', 'test1'],
        data: [['test', 'test']]
      }
    });
  }
}
