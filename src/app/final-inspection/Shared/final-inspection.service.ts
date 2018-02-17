import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { FinalInspection } from './final-inspection.model';

@Injectable()
export class FinalInspectionService {

  selectedInspection: FinalInspection;
  inspectionHistory: FinalInspection[];
  constructor(private http: Http) { }  

  getData(controllerName, actionName) {    
    this.http.get('http://localhost:51714/api/' + controllerName + "/" + actionName)
    .map((data: Response) => {
      return data.json() as FinalInspection[];
    }).toPromise().then(x=> {
      this.inspectionHistory = x;
    })
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
