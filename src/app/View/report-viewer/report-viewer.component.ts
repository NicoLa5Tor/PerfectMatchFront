import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiReportService } from 'src/app/Services/api-reportViewer.services';
import { TokenService } from 'src/app/Services/token.service';
import { PurchaseSale } from 'src/app/Models/PurchaseSale';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { NewUserTable } from 'src/app/Models/NewUserTable';
import { AllMovementTable } from 'src/app/Models/AllMovementTable';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css'],
})

export class ReportViewerComponent {
  pdfSrc: string = '';
  selectedReportType: string = ''; 
  reportPath: string = '';
  reportTypes: string[] = [];

  startDateStr: string = '';
  endDateStr: string = '';

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  idUser: number = 0;
  originalTableDataSales: PurchaseSale[] = [];
  originalTableDataUser: NewUserTable[] = [];
  originalTableDataMov: AllMovementTable[] = [];
  tableDataMov: AllMovementTable[] = [];
  tableDataSales: PurchaseSale[] = [];
  tableDataUser: NewUserTable[] = [];


  salesDisplayedColumns: string[] = ['date', 'name', 'publication', 'amount'];
  userDisplayedColumns: string[] = ['year', 'week', 'startDate', 'endDate', 'userQuantity'];
  movDisplayedColumns: string[] = ['date', 'seller', 'buyer', 'publication', 'amount'];

  showTableMov: boolean = false;
  showTableSales: boolean = false;
  showTableUser: boolean = false;
  showViewer: boolean = false;
  showGraph: boolean = false;
  nameFilter: string = '';

  constructor(private http: HttpClient, private _apiReportService:ApiReportService, private _tok:TokenService){
    this.idUser = _tok.getIdUser();
  }
  ngOnInit(): void {
    this.getReportTypes();
  }

  applyNameFilter() {
    const searchText = this.nameFilter.toLowerCase();

    if (searchText == '') {
      this.tableDataSales = this.originalTableDataSales;
    } else {
      this.tableDataSales = this.originalTableDataSales.filter(item => item.name.toLowerCase().includes(searchText));
    }
  }

  applyDateFilter(){

    this.startDateStr = this.range.value.start ? this.range.value.start.toISOString().slice(0, 10) : '';;
    this.endDateStr = this.range.value.end ? this.range.value.end.toISOString().slice(0, 10) : '';
    const dStartDate = new Date(this.startDateStr);
    const dEndDate = new Date(this.endDateStr);

    console.log(dStartDate)
    if (!isNaN(dStartDate.getTime()) && !isNaN(dEndDate.getTime())) {
      this.tableDataSales = this.tableDataSales.filter(item => {
        const fechaItem = new Date(item.date);

        return fechaItem >= dStartDate && fechaItem <= dEndDate;
      });
    } else {
      console.log('Fechas no válidas');
    }
  
  }

  getTableList() {
    this.getReportPath(this.selectedReportType);

    this.startDateStr = this.range.value.start ? this.range.value.start.toISOString().slice(0, 10) : '';;
    this.endDateStr = this.range.value.end ? this.range.value.end.toISOString().slice(0, 10) : '';

    console.log(`Inicio: ${this.startDateStr} - Fin: ${this.endDateStr}`);

    if(this.reportPath == "NewUserReport")
    {
      this._apiReportService.getUserTableList(this.startDateStr, this.endDateStr).subscribe((data) => {
        console.log(data);
        this.originalTableDataUser = data;
        this.tableDataUser = data;
        this.showTableMov = false;
        this.showTableSales = false;
        this.showTableUser = true;
        this.showGraph = true;
        this.showViewer = false;
      });

      this._apiReportService.getUserGraphList(this.startDateStr, this.endDateStr).subscribe(data => {
        this.barChartData.labels = data.map(item => `${item.yearNumber} - Wk ${item.weekNumber}`);
        this.barChartData.datasets[0].data = data.map(item => item.userQuantity);
        // Actualiza el gráfico después de llenar los datos
        this.chart?.update();
      });

    }else if(this.reportPath == "AllMovementReport")
    {
      this._apiReportService.getMovementTableList(this.startDateStr, this.endDateStr).subscribe((data) => {
        console.log(data);
        this.originalTableDataMov = data;
        this.tableDataMov = data;
        this.showTableMov = true;
        this.showTableSales = false;
        this.showTableUser = false;
        this.showGraph = false;
        this.showViewer = false;
      });  
    }else{
      this._apiReportService.getMovTableList(this.reportPath, this.idUser).subscribe((data) => {
        this.originalTableDataSales = data;
        this.tableDataSales = data;
        this.showTableMov = false;
        this.showTableSales = true;
        this.showTableUser = false;
        this.showGraph = false;
        this.showViewer = false;
      });
    }
  }

  changeSelected(){
    this.getReportPath(this.selectedReportType);
  }

  getReportTypes() {
    this._apiReportService.getReportTypes()
      .subscribe(data => {
        this.reportTypes = data;
      });
  }

  getReportPath(reportName: string) {
    this._apiReportService.getReportPath(reportName)
    .subscribe(data => {
      this.reportPath = data;
    }, error => {
      console.error('Error al obtener la ruta del informe:', error);
    });
  }

  getReport() {
    this.showTableMov = false;
    this.showTableUser = false;
    this.showTableSales = false;
    this.showGraph = false;
    this.showViewer = true;
    this.getReportPath(this.selectedReportType);

    this.startDateStr = this.range.value.start ? this.range.value.start.toISOString().slice(0, 10) : '';;
    this.endDateStr = this.range.value.end ? this.range.value.end.toISOString().slice(0, 10) : '';
  
    if (!this.reportPath) {
      console.log("La ruta del informe no está disponible.");
      return;
    }
    if (this.reportPath === 'SalesReport' || this.reportPath === 'PurchaseReport') {
      this._apiReportService.getReportPdf(this.idUser, this.reportPath, '2023-01-01', '2023-01-02' )
        .subscribe((data: ArrayBuffer) => this.displayReport(data));
    }
    if (this.reportPath === 'NewUserReport' || this.reportPath === 'AllMovementReport') {
      this._apiReportService.getReportPdfWithParams(this.idUser, this.reportPath, this.startDateStr, this.endDateStr)
        .subscribe((data: ArrayBuffer) => this.displayReport(data));
    }
  }

  private displayReport(data: ArrayBuffer) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    this.pdfSrc = url;
  }

  downloadReport() {

    this.startDateStr = this.range.value.start ? this.range.value.start.toISOString().slice(0, 10) : '';;
    this.endDateStr = this.range.value.end ? this.range.value.end.toISOString().slice(0, 10) : '';

    if (this.pdfSrc) {
      const reportName = this.reportPath;
      if (this.reportPath === 'SalesReport' || this.reportPath === 'PurchaseReport') {
        this._apiReportService.downloadNormalPdf(this.idUser,reportName, '2023-01-01','2023-01-02')
        .subscribe((data: Blob) => {

          const blobUrl = window.URL.createObjectURL(data);

          const anchor = document.createElement('a');
          anchor.href = blobUrl;
          anchor.download = reportName; 
          
          anchor.click();

          window.URL.revokeObjectURL(blobUrl);
        });
      }
      if (this.reportPath === 'NewUserReport' || this.reportPath === 'AllMovementReport') {
        this._apiReportService.downloadParamsPdf(this.idUser,reportName, this.startDateStr, this.endDateStr)
        .subscribe((data: Blob) => {
          const blobUrl = window.URL.createObjectURL(data);
          const anchor = document.createElement('a');
          anchor.href = blobUrl;
          anchor.download = reportName; 
          anchor.click();
          window.URL.revokeObjectURL(blobUrl);
        });
      }
      
    }else console.log('No funciona');
  }

  ///////////////

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year and Week'
        }
      },
      y: {
        title: {
          display: true,
          text: 'User Quantity'
        },
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'User Quantity',
      },
    ],
  };


  // Eventos (puedes mantener tus métodos chartClicked y chartHovered sin cambios)

  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    //console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    //console.log(event, active);
  }
}


