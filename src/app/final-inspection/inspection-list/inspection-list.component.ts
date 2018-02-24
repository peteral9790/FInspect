import { Component, OnInit } from '@angular/core';
import { FinalInspectionService } from '../shared/final-inspection.service';
import { FinalInspection } from '../shared/final-inspection.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit {
  showList: boolean = true;
  inspectionHistory: FinalInspection[];
  constructor(private inspectionService: FinalInspectionService, private toastr: ToastrService) { }

  ngOnInit() {
    this.inspectionService.getData("FinalInspection", "GetInspectionRecords");    
  }

  toggleList() {
    if (this.showList == true) {
      this.showList = false;
      this.toastr.success("Got data!", "FInspect");
    } else {
      this.showList = true;
      this.toastr.success("Got data!", "FInspect");
    }
  }

}
