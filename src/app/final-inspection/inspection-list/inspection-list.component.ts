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
  viewList: FinalInspection[];
  constructor(private inspectionService: FinalInspectionService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getInspectionData();
  }

  getInspectionData() {
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
        this.toastr.warning('Deleted successfully', 'Final Inspection');
        this.getInspectionData();
      })
    }
  }

  getAssemblyDetails(partNumber?: string) {
    this.inspectionService.getAssemblyDetails(partNumber);
  }

  editInspection(inspection: FinalInspection) {
    
    this.inspectionService.selectedInspection = Object.assign({}, inspection);
  }

  filterTable(field: string) {
    this.inspectionService.inspectionSort(field);
  }
}
