import { Component, OnInit } from '@angular/core';
import { InspectorService } from '../shared/inspector.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inspector-list',
  templateUrl: './inspector-list.component.html',
  styleUrls: ['./inspector-list.component.css']
})
export class InspectorListComponent implements OnInit {
  showList: boolean = true;
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
}
