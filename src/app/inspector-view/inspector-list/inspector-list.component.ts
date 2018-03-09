import { Component, OnInit } from '@angular/core';
import { InspectorService } from '../shared/inspector.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { Inspector } from '../shared/Inspector';

@Component({
  selector: 'app-inspector-list',
  templateUrl: './inspector-list.component.html',
  styleUrls: ['./inspector-list.component.css']
})
export class InspectorListComponent implements OnInit {
  showList: boolean = true;
  showForm: boolean = true;

  constructor(private inspectorService: InspectorService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getInspectorList();
  }

  getInspectorList() {
    this.inspectorService.getData();
  }

  toggleList() {
    if (this.showList == true) {
      this.showList = false;
    } else {
      this.showList = true;
    }
  }

  editInspector(inspector: Inspector) {
    this.inspectorService.selectedInspector = Object.assign({}, inspector);
    this.inspectorService.showDetails = true;
  }

  deleteInspector(id: number) {
    if (confirm('Are you sure you want to delete this record?') == true) {
      this.inspectorService.deleteInspector(id)
        .subscribe(x => {
          this.toastr.warning('Inspector Deleted Successfully', 'Manage Inspectors');
          this.inspectorService.getData();
        })
    }
    this.inspectorService.resetInspector();
  }
}

