import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { PurchaseSale } from '../Models/PurchaseSale';
import { NewUserTable } from '../Models/NewUserTable';
import { NewUserGraph } from '../Models/NewUserGraph';
import { AllMovementTable } from '../Models/AllMovementTable';

@Injectable({
  providedIn: 'root'
})
export class ApiReportService {
  endPoint : string = enviroment.endPoint;
  apiUrl : string = this.endPoint + "api/Report/";

  constructor(private http: HttpClient) { }

  getReportTypes(): Observable<string[]> {
    const url = `${this.apiUrl}ReportType`;
    return this.http.get<string[]>(url);
  }

  getReportPath(reportName: string): Observable<string> {
    const url = `${this.apiUrl}ReportPath/${reportName}`;
    return this.http.get(url, { responseType: 'text' });
  }
  
  getReportPdf(userId: number,reportName: string,startDate: string, endDate: string): Observable<ArrayBuffer> {
    const url = `${this.apiUrl}GetRDLC/${userId}/${reportName}/${startDate}/${endDate}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  getReportPdfWithParams(userId: number,reportName: string,startDate: string, endDate: string): Observable<ArrayBuffer> {
    const url = `${this.apiUrl}GetRDLC/${userId}/${reportName}/${startDate}/${endDate}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  downloadNormalPdf(userId: number,reportName: string,startDate: string, endDate: string): Observable<Blob> {
    const url = `${this.apiUrl}GetRDLC/${userId}/${reportName}/${startDate}/${endDate}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  downloadParamsPdf(userId: number,reportName: string,startDate: string, endDate: string): Observable<Blob> {
    const url = `${this.apiUrl}GetRDLC/${userId}/${reportName}/${startDate}/${endDate}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getMovTableList(reportName: string, userId: number): Observable<PurchaseSale[]> {
    return this.http.get<PurchaseSale[]>(`${this.apiUrl}TableList/${reportName}/${userId}`);
  }

  getUserTableList(startDate: string, endDate: string): Observable<NewUserTable[]> {
    return this.http.get<NewUserTable[]>(`${this.apiUrl}GetTableInfo/${startDate}/${endDate}`);
  }

  getUserGraphList(startDate: string, endDate: string): Observable<NewUserGraph[]> {
    return this.http.get<NewUserGraph[]>(`${this.apiUrl}GetGraphInfo/${startDate}/${endDate}`);
  }

  getMovementTableList(startDate: string, endDate: string): Observable<AllMovementTable[]> {
    return this.http.get<AllMovementTable[]>(`${this.apiUrl}GetTableMov/${startDate}/${endDate}`);
  }
}
