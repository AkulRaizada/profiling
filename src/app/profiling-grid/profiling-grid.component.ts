import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { ColDef, GetContextMenuItemsParams, ITooltipParams, MenuItemDef, ValueFormatterParams } from 'ag-grid-enterprise';

@Component({
  selector: 'app-profiling-grid',
  templateUrl: './profiling-grid.component.html',
  styleUrls: ['./profiling-grid.component.css']
})
export class ProfilingGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  constructor() { }

  rowData: any;
  columnDefs: any;
  shwNotesGrid: boolean = false;
  pageSize: number = 300;
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  }
  defaultExcelExportParams:any;

  ngOnInit(): void {
    this.rowData = [{
      "username":"1234",
      "activity":"1234"
    }]
    this.columnDefs = this.columnDefsAL;
  }

  currRowData: any;
  onRowClicked(event: any) {
    this.currRowData = event.data;
  }
  gridApi: any;
  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  getContextMenuItems = (
    params: GetContextMenuItemsParams
  ): (string | MenuItemDef)[] => {
    var result: (string | any)[] = [

      'copy',
      'copyWithHeaders',
      'export',
    ];
    return result;
  }
  columnDefsAL: ColDef[] = [
    { headerName: 'User Name', field: 'username'},
    { headerName: 'Activity', field: 'activity'}
  ]
  overlayLoadingTemplate =
    `<span class="ag-overlay-loading-center">
  Please wait while your Data is loading
  </span>`;
  overlayNoRowsTemplate =
    `<span style="padding: 10px;
   border: 2px solid #444;
   background: lightgoldenrodyellow;">
   No Data Found in the System
   </span>`;


}
