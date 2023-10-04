import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiReportService } from 'src/app/Services/api-reportViewer.services';


@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent {
  pdfSrc: string = '';
  selectedReportType: string = ''; 
  reportPath: string = '';
  reportTypes: string[] = [];
  startDate: string = '';
  endDate: string = '';
  constructor(private http: HttpClient, private _apiReportService:ApiReportService){

  }
  ngOnInit(): void {
    this.getReportTypes();
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
    this.getReportPath(this.selectedReportType);
  
    if (!this.reportPath) {
      console.log("La ruta del informe no está disponible.");
      return;
    }
    if (this.reportPath === 'SalesReport') {
      this._apiReportService.getReportPdf(this.reportPath)
        .subscribe((data: ArrayBuffer) => this.displayReport(data));
    }
    if (this.reportPath === 'NewUserReport') {
      this._apiReportService.getReportPdfWithParams(this.reportPath, this.startDate, this.endDate)
        .subscribe((data: ArrayBuffer) => this.displayReport(data));
    }
  }

  private displayReport(data: ArrayBuffer) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    this.pdfSrc = url;
  }

  downloadReport() {

    // Verificar si hay un PDF cargado actualmente
    if (this.pdfSrc) {
      // Extraer el nombre del reporte de la URL actual
      const reportName = this.reportPath;
      if (this.reportPath === 'SalesReport') {
        this._apiReportService.downloadNormalPdf(reportName)
        .subscribe((data: Blob) => {
          // Crear un objeto URL para el blob del PDF
          const blobUrl = window.URL.createObjectURL(data);

          // Crear un elemento <a> para descargar el PDF
          const anchor = document.createElement('a');
          anchor.href = blobUrl;
          anchor.download = reportName; // Establecer el nombre del archivo
          
          // Simular un clic en el enlace para iniciar la descarga
          anchor.click();

          // Liberar el objeto URL creado
          window.URL.revokeObjectURL(blobUrl);
        });
      }
      if (this.reportPath === 'NewUserReport') {
        this._apiReportService.downloadParamsPdf(reportName, this.startDate, this.endDate)
        .subscribe((data: Blob) => {
          // Crear un objeto URL para el blob del PDF
          const blobUrl = window.URL.createObjectURL(data);

          // Crear un elemento <a> para descargar el PDF
          const anchor = document.createElement('a');
          anchor.href = blobUrl;
          anchor.download = reportName; // Establecer el nombre del archivo
          
          // Simular un clic en el enlace para iniciar la descarga
          anchor.click();

          // Liberar el objeto URL creado
          window.URL.revokeObjectURL(blobUrl);
        });
      }
      // Llamar al servicio para descargar el PDF
      
    }else console.log('No funciona');
  }
}
