import { Injectable, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FInspectErrorHandler } from '../../Common/finspect-error-handler';

import { FinalInspection } from './final-inspection.model';
import { FinalInspectionUpload } from './final-inspection-upload.model';
import { InspectionFilter } from './inspection-filter.model';
import { MIStatus } from './mistatus.model';
import { Assembly } from './assembly.model';
import { UploadList } from './upload-list.model';

@Injectable()
export class FinalInspectionService {
  loadingList: boolean = false;
  error: Error;
  loadingDetails: boolean = false;
  MiDetails: boolean = false;
  selectedInspection: FinalInspection;
  inspectionHistory: FinalInspection[];
  assemblyDetails: Assembly;
  MIStatusData: MIStatus;
  currentFilter: InspectionFilter = {
    PartNumber: 0,
    MiStatusBarcode: 0,
    DateInspected: 0,
    QuantityInspected: 0,
    QuantityAccepted: 0,
    MfgLocation: 0,
    InspectionLocation: 0,
    InspectionType: 0,
    InspectorName: 0
  }

  //Upload Variables
  uploadErrorMessage: string;
  public isUploadingFiles: Boolean = false;
  uploadResult: any;
  selectedFileNames: string[] = [];
  uploadedFileNames: string[] = [];
  filesToUpload: File[];

  constructor(private http: Http, private fInspectErrorHandler: FInspectErrorHandler) {
    this.selectedFileNames = [];
    this.uploadedFileNames = [];
    this.resetSelectedInspection();
  }

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

  getMIStatusData(id: string) {
    this.loadingDetails = true;
    this.selectedInspection.MiStatus = new MIStatus();
    this.http.get('/api/MiStatus/GetMiStatusData/' + id)
      .map((data: Response) => {
        return data.json() as MIStatus;
      }).subscribe(data => {
        //this.MIStatusData = data;
        this.selectedInspection.MiStatus = data;
        this.selectedInspection.TMSPartNumber = data.MINumber;
        this.selectedInspection.MiStatusBarcode = id;
        this.selectedInspection.MfgLocation = data.Location;
        this.MiDetails = true;
        this.loadingDetails = false;
        console.log(this.selectedInspection);
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
    console.log(body);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('/api/FinalInspection/UpdateInspection/' + inspection.Id,
      body,
      requestOptions).map(res => res.json());
  }

  getAssemblyDetails(partNumber: string) {
    this.clearAssemblyDetails();
    this.loadingDetails = true;
    this.http.get('/api/AssemblyDetails/GetAssemblyDetails/' + partNumber)
      .map((data: Response) => {
        return data.json() as Assembly;
      }).subscribe(data => {
        this.assemblyDetails = data;
        this.selectedInspection.Assembly = data;
        this.loadingDetails = false;
      },
        err => {
          this.error = err;
          this.fInspectErrorHandler.handleError(this.error);
          this.loadingDetails = false;
        }
      )
  }

  clearAssemblyDetails() {
    this.assemblyDetails = {
      TMSPartNumber: '',
      CustomerPartNumber: '',
      CableMI: '',
      CableDescription: '',
      Length: 0,
      FWDConnType: '',
      FWDConnector: '',
      FWDIntermediate: '',
      AFTIntermediate: '',
      AFTConnector: '',
      AFTConnType: ''
    }
  }

  resetSelectedInspection() {
    this.selectedInspection = {
      Id: null,
      TMSPartNumber: '',
      MiStatusBarcode: '',
      QuantityInspected: '',
      QuantityAccepted: '',
      InspectionType: '',
      MfgLocation: '',
      InspectionLocation: '',
      InspectorName: '',
      EmployeeId: '',
      DateInspected: '',
      FinalInspectionUploads: [],
      MiStatus: {
        Id: null,
        SalesOrder: '',
        MINumber: '',
        MIRev: '',
        Location: '',
        CustomerName: ''
      },
      Assembly: null
    }
  }

  uploadFiles(fileInput: any, fileNames: any) {
    this.uploadResult = "";
    this.filesToUpload = fileInput;
    this.selectedFileNames = fileNames;
    let selectedInspection = this.selectedInspection;
    this.uploadedFileNames = this.getListFromObjects(selectedInspection.FinalInspectionUploads);

    if (this.filesToUpload.length > 0) {
      this.isUploadingFiles = true;
      let formData: FormData = new FormData();

      for (var i = 0; i < this.filesToUpload.length; i++) {
        formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
        this.uploadedFileNames.push(this.filesToUpload[i].name);
      }


      let apiUrl = "/api/FinalInspection/UploadInspectionFiles";

      this.http.post(apiUrl, formData)
        .map((res: Response) => res.json())
        .subscribe
        (
        data => {
          this.uploadResult = data;
          this.uploadErrorMessage = "";
          //this.selectedInspection.FinalInspectionUploads = this.uploadedFileNames;
          selectedInspection.FinalInspectionUploads = this.getObjectsFromList(this.uploadedFileNames);
        },
        err => {
          this.fInspectErrorHandler.handleError(err);
          this.uploadErrorMessage = err;
          this.isUploadingFiles = false;
        },
        () => {
          this.isUploadingFiles = false;
          this.selectedFileNames = [];
          this.filesToUpload = [];
        }
        )
    }
  }

  public getListFromObjects(objUploads: FinalInspectionUpload[]): string[] {
    var strUploads: string[] = [];
    for (let upload of objUploads) {
      let newUpload: string;
      newUpload = upload.Attachment;
      strUploads.push(newUpload);
    }
    return strUploads;
  }  
  public getObjectsFromList(strUploads: string[]): FinalInspectionUpload[] {
    let objUploads: FinalInspectionUpload[]=[];
    for (let upload of strUploads) {
        var newUpload = new FinalInspectionUpload();
        newUpload.Attachment = upload;
        objUploads.push(newUpload);
    }
    return objUploads;
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
        break;
      }
      case 'PartNumber': {
        if (this.currentFilter.PartNumber < 1) {
          this.ascPartNumberSort('PartNumber');
          this.resetCurrentFilters();
          this.currentFilter.PartNumber = 1;
        } else {
          this.dscPartNumberSort('PartNumber');
          this.resetCurrentFilters();
          this.currentFilter.PartNumber = -1;
        }
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
        break;
      }
      case 'MfgLocation': {
        if (this.currentFilter.MfgLocation < 1) {
          this.ascSort('MfgLocation');
          this.resetCurrentFilters();
          this.currentFilter.MfgLocation = 1;
        } else {
          this.dscSort('MfgLocation');
          this.resetCurrentFilters();
          this.currentFilter.MfgLocation = -1;
        }
        break;
      }
      case 'InspectionLocation': {
        if (this.currentFilter.InspectionLocation < 1) {
          this.ascSort('InspectionLocation');
          this.resetCurrentFilters();
          this.currentFilter.InspectionLocation = 1;
        } else {
          this.dscSort('InspectionLocation');
          this.resetCurrentFilters();
          this.currentFilter.InspectionLocation = -1;
        }
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

  ascPartNumberSort(field: string) {
    this.inspectionHistory.sort((a, b) => {
      return a.TMSPartNumber.localeCompare(b.TMSPartNumber);
    })
  }

  dscPartNumberSort(field: string) {
    this.inspectionHistory.sort((a, b) => {
      return (a.TMSPartNumber.localeCompare(b.TMSPartNumber)) * -1;
    })
  }

  resetCurrentFilters() {
    this.currentFilter.PartNumber = 0;
    this.currentFilter.MiStatusBarcode = 0;
    this.currentFilter.DateInspected = 0;
    this.currentFilter.QuantityInspected = 0;
    this.currentFilter.QuantityAccepted = 0;
    this.currentFilter.MfgLocation = 0;
    this.currentFilter.InspectionLocation = 0;
    this.currentFilter.InspectionType = 0;
    this.currentFilter.InspectorName = 0;
  }
}



