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
    this.inspectionService.getData("FinalInspection", "GetInspections");    
  }

  toggleList() {
    if (this.showList == true) {
      this.showList = false;
    } else {
      this.showList = true;
    }
  }

  deleteInspection(id: number) {
    if (confirm('Are you sure you want to delete this record?') == true) {
      this.inspectionService.deleteInspection(id)
      .subscribe(x => {
        this.inspectionService.getData("FinalInspection", "GetInspections");
        this.toastr.warning('Deleted successfully', 'Final Inspection');
      })
    }
  }

  editInspection(inspection: FinalInspection) {
    this.inspectionService.selectedInspection = Object.assign({}, inspection);
    console.log(inspection);
  }

}
