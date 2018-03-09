import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FInspectErrorHandler } from '../../Common/finspect-error-handler';

import { FinalInspection } from './final-inspection.model';
import { MIStatus } from './mistatus.model';

@Injectable()
export class FinalInspectionService {
  loadingList: boolean = false;
  loadingDetails: boolean = false;
  MiDetails: boolean = false;
  selectedInspection: FinalInspection;
  inspectionHistory: FinalInspection[];
  MIStatusData: MIStatus;
  
  constructor(private http: Http, private fInspectErrorHandler: FInspectErrorHandler) { }

  getData(controllerName, actionName) {
    this.loadingList = true;
    this.http.get('/api/' + controllerName + "/" + actionName)
      .map((data: Response) => {
        return data.json() as FinalInspection[];
      }).subscribe(data => {
        this.inspectionHistory = data;
        this.loadingList = false },
        err => {
          this.fInspectErrorHandler.handleError(err);
          this.loadingList = false;
        }
      )
  }

  getMIStatusData(id: number) {
    this.loadingDetails = true;
    this.http.get('/api/MiStatus/GetMiStatusData/' + id)
      .map((data: Response) => {
        return data.json() as MIStatus;
      }).subscribe(data => {
        this.MIStatusData = data;
        this.selectedInspection.TMSPartNumber = data.MINumber;
        this.MiDetails = true;
        this.loadingDetails = false },
        err => {
          this.fInspectErrorHandler.handleError(err);
          this.loadingDetails = false;
        }
      )
  }
 
  postInspection(inspection: FinalInspection) {
    var body = JSON.stringify(inspection);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('/api/FinalInspection/AddNewInspection', body, requestOptions).map(x => x.json());
  }

  deleteInspection(id: number) {
    return this.http.delete('/api/FinalInspection/DeleteInspection/' + id).map(res => res.json());
  }

  putInspection(inspection: FinalInspection) {
    var body = JSON.stringify(inspection);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:4200/api/FinalInspection/UpdateInspection/' + inspection.Id,
    body,
    requestOptions).map(res => res.json());
  }
  
  resetSelectedInspection() {
    this.selectedInspection = {
      Id: null,
      TMSPartNumber: '',
      MiStatusBarcode: '',
      QuantityInspected: '',
      QuantityAccepted: '',
      InspectionType: '',
      InspectorName: '',
      EmployeeId: '',
      DateInspected: ''
    }
    this.MIStatusData = {
      Id: null,
      SalesOrder: '',
      MINumber: '',
      MIRev: '',
      Location: '',
      CustomerName:'',
    }
  }
 
  /* getEmployeeList() {
    this.http.get('http://localhost:49960/api/Employee')
      .map((data: Response) => {
        return data.json() as Employee[];
      }).toPromise().then(x => {
        this.employeeList = x;
      })
  } */
  /* selectedEmployee: Employee;
  employeeList: Employee[];
  constructor(private http: Http) { }

  postEmployee(emp: Employee) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:49960/api/Employee', body, requestOptions).map(x => x.json());
  }

  putEmployee(id, emp) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions});
    return this.http.put('http://localhost:49960/api/Employee/' + id,
    body,
    requestOptions).map(res => res.json());
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:49960/api/Employee/' + id).map(res => res.json());
  } */
}
