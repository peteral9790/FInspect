import { Component, OnInit } from '@angular/core';
import { FinalInspectionService } from '../shared/final-inspection.service';
import { FinalInspection} from '../shared/final-inspection.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit {
  inspectionHistory: FinalInspection[];
  constructor(private inspectionService: FinalInspectionService) { }
  
  ngOnInit() {
    this.inspectionService.getData("FinalInspection", "GetFinalInspectionRecords");
  }

}
