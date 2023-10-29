import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { PurchaseSale } from '../Models/PurchaseSale';

@Injectable({
  providedIn: 'root'
})
export class ApiReportService {
  endPoint : string = enviroment.endPoint;
  apiUrl : string = this.endPoint + "api/Report/";

  constructor(private http: HttpClient) { }

  getReportTypes(): Observable<string[]> {
    const url = `${this.apiUrl}ReportType`;
    console.log(url);
    return this.http.get<string[]>(url);
  }

  getReportPath(reportName: string): Observable<string> {
    const url = `${this.apiUrl}ReportPath/${reportName}`;
    return this.http.get(url, { responseType: 'text' });
  }
  
  getReportPdf(reportName: string, userId: number): Observable<ArrayBuffer> {
    const url = `${this.apiUrl}ServerReport/${reportName}/${userId}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  getReportPdfWithParams(reportName: string, param1Value: string, param2Value: string): Observable<ArrayBuffer> {
    const url = `${this.apiUrl}${reportName}/${param1Value}/${param2Value}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  downloadNormalPdf(reportName: string, userId: number): Observable<Blob> {
    const url = `${this.apiUrl}ServerReport/${reportName}/${userId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  downloadParamsPdf(reportName: string, param1Value: string, param2Value: string): Observable<Blob> {
    const url = `${this.apiUrl}${reportName}/${param1Value}/${param2Value}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  public getTableList(reportName: string, userId: number): Observable<PurchaseSale[]> {
    return this.http.get<PurchaseSale[]>(`${this.apiUrl}TableList/${reportName}/${userId}`);
  }

}
