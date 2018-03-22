import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FInspectErrorHandler } from '../../Common/finspect-error-handler';

import { FinalInspection } from './final-inspection.model';
import { InspectionFilter } from './inspection-filter.model';
import { MIStatus } from './mistatus.model';

@Injectable()
export class FinalInspectionService {
  loadingList: boolean = false;
  error: Error;
  loadingDetails: boolean = false;
  MiDetails: boolean = false;
  selectedInspection: FinalInspection;
  inspectionHistory: FinalInspection[];
  MIStatusData: MIStatus;
  currentFilter: InspectionFilter = {
    MiStatusBarcode: 0,
    DateInspected: 0,
    QuantityInspected: 0,
    QuantityAccepted: 0,
    InspectionType: 0,
    InspectorName: 0
  }

  constructor(private http: Http, private fInspectErrorHandler: FInspectErrorHandler) { }

  getData(controllerName, actionName) {
    this.loadingList = true;
    this.http.get('/api/' + controllerName + "/" + actionName)
      .map((data: Response) => {
        return data.json() as FinalInspection[];
      }).subscribe(data => {
        this.inspectionHistory = data;
        this.loadingList = false
      },
        err => {
          this.error = err;
          this.fInspectErrorHandler.handleError(this.error);
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
        this.loadingDetails = false
      },
        err => {
          this.error = err;
          this.fInspectErrorHandler.handleError(this.error);
          this.loadingDetails = false;
        }
      )
  }

  postInspection(inspection: FinalInspection) {
    var body = JSON.stringify(inspection);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http
      .post('/api/FinalInspection/AddNewInspection', body, requestOptions)
      .map(x => x.json());
  }

  deleteInspection(id: number) {
    return this.http.delete('/api/FinalInspection/DeleteInspection/' + id)
      .map(res => res.json());
  }

  putInspection(inspection: FinalInspection) {
    var body = JSON.stringify(inspection);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('/api/FinalInspection/UpdateInspection/' + inspection.Id,
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
      CustomerName: '',
    }
  }

  inspectionSort(field: string) {
    switch (field) {
      case 'MiStatusBarcode': {
        if (this.currentFilter.MiStatusBarcode < 1) {
          this.ascSort('MiStatusBarcode');
          this.resetCurrentFilters();
          this.currentFilter.MiStatusBarcode = 1;
        } else {
          this.dscSort('MiStatusBarcode');
          this.resetCurrentFilters();
          this.currentFilter.MiStatusBarcode = -1;
        }
        console.log(this.currentFilter);
        break;
      }
      case 'DateInspected': {
        if (this.currentFilter.DateInspected < 1) {
          this.ascSort('DateInspected');
          this.resetCurrentFilters();
          this.currentFilter.DateInspected = 1;
        } else {
          this.dscSort('DateInspected');
          this.resetCurrentFilters();
          this.currentFilter.DateInspected = -1;
        }
        console.log(this.currentFilter);
        break;
      }
      case 'QuantityInspected': {
        if (this.currentFilter.QuantityInspected < 1) {
          this.ascSort('QuantityInspected');
          this.resetCurrentFilters();
          this.currentFilter.QuantityInspected = 1;
        } else {
          this.dscSort('QuantityInspected');
          this.resetCurrentFilters();
          this.currentFilter.QuantityInspected = -1;
        }
        console.log(this.currentFilter);
        break;
      }
      case 'QuantityAccepted': {
        if (this.currentFilter.QuantityAccepted < 1) {
          this.ascSort('QuantityAccepted');
          this.resetCurrentFilters();
          this.currentFilter.QuantityAccepted = 1;
        } else {
          this.dscSort('QuantityAccepted');
          this.resetCurrentFilters();
          this.currentFilter.QuantityAccepted = -1;
        }
        console.log(this.currentFilter);
        break;
      }
      case 'InspectionType': {
        if (this.currentFilter.InspectionType < 1) {
          this.ascSort('InspectionType');
          this.resetCurrentFilters();
          this.currentFilter.InspectionType = 1;
        } else {
          this.dscSort('InspectionType');
          this.resetCurrentFilters();
          this.currentFilter.InspectionType = -1;
        }
        console.log(this.currentFilter);
        break;
      }
      case 'InspectorName': {
        if (this.currentFilter.InspectorName < 1) {
          this.ascSort('InspectorName');
          this.resetCurrentFilters();
          this.currentFilter.InspectorName = 1;
        } else {
          this.dscSort('InspectorName');
          this.resetCurrentFilters();
          this.currentFilter.InspectorName = -1;
        }
        console.log(this.currentFilter);
        break;
      }
      default: {
        console.log("Invalid choice");
        break;
      }
    }
  }

  ascSort(field: string) {
    this.inspectionHistory.sort((a, b) => {
      if (a[field] > b[field]) {
        return 1;
      } else if (a[field] < b[field]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  dscSort(field: string) {
    this.inspectionHistory.sort((a, b) => {
      if (a[field] > b[field]) {
        return -1;
      } else if (a[field] < b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  resetCurrentFilters() {
    this.currentFilter.MiStatusBarcode = 0;
    this.currentFilter.DateInspected = 0;
    this.currentFilter.QuantityInspected = 0;
    this.currentFilter.QuantityAccepted = 0;
    this.currentFilter.InspectionType = 0;
    this.currentFilter.InspectorName = 0;
  }
}



