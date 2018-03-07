import { Component, OnInit } from '@angular/core';
import { InspectorService } from '../shared/inspector.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import {Inspector} from '../shared/Inspector';

@Component({
  selector: 'app-inspector-list',
  templateUrl: './inspector-list.component.html',
  styleUrls: ['./inspector-list.component.css']
})
export class InspectorListComponent implements OnInit {
  showList: boolean = true;
  showForm: boolean = false;
  constructor(private inspectorService: InspectorService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getInspectorList();
  }

  getInspectorList() {
    this.inspectorService.getData("Inspector", "GetInspectors");
  }

  toggleList() {
    if (this.showList == true) {
      this.showList = false;
    } else {
      this.showList = true;
    }
  }

  toggleForm() {
    console.log(this.showForm);
    if (this.showForm == true) {
      this.showForm = false;
      console.log(this.showForm);
    } else {
      this.showForm = true;
      console.log(this.showForm);
    }
  }

  editInspector(inspector: Inspector) {
    this.inspectorService.selectedInspector = Object.assign({}, inspector);
  }
}
