import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FInspectErrorHandler } from '../../Common/finspect-error-handler';

import { Inspector } from './inspector'

@Injectable()
export class InspectorService {
  inspectorList: Inspector[];
  loading: boolean = false;

  constructor(private http: Http, private fInspectErrorHandler: FInspectErrorHandler) { }

  getData(controllerName, actionName) {
    this.loading = true;
    this.http.get('/api/' + controllerName + "/" + actionName)
      .map((data: Response) => {
        return data.json() as Inspector[];
      }).subscribe(data => {
        this.inspectorList = data;
        this.loading = false 
      },
      err => {
        this.fInspectErrorHandler.handleError(err);
        this.loading = false;
      })
    }
}

