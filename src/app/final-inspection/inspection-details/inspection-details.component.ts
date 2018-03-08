import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FinalInspectionService } from '../shared/final-inspection.service';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: ['./inspection-details.component.css']
})
export class InspectionDetailsComponent implements OnInit {
  showDetails: boolean = true;
  constructor(private inspectionService: FinalInspectionService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form!=null)
      form.reset();
    this.inspectionService.selectedInspection = {
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
    this.inspectionService.MIStatusData = {
      Id: null,
      SalesOrder: '',
      MINumber: '',
      MIRev: '',
      Location: '',
      CustomerName:'',
    }
    this.inspectionService.MiDetails = false;
  }

  onSubmit(form: NgForm) {
    var id = this.inspectionService.selectedInspection.Id;
    var inspection = this.inspectionService.selectedInspection;
    if (id == null) {
      this.inspectionService.postInspection(form.value)
        .subscribe(data => {
          this.resetForm(form);          
          this.toastr.success('New Record added successfully!', 'Final Inspection');
          this.inspectionService.getData("FinalInspection", "GetInspections");
        })
    } else {
      if (confirm('Are you sure you want to modify this record?') == true) {
        this.inspectionService.putInspection(form.value)
          .subscribe(data => {
            this.resetForm(form);
            this.toastr.info('Record updated successfully!', 'Final Inspection');
            this.inspectionService.getData("FinalInspection", "GetInspections");
          })
      } else {
        this.resetForm(form);
      }
    }
  }

  refreshData() {
    this.inspectionService.getData("FinalInspection", "GetInspections");
  }  

  toggleDetails() {
    if (this.showDetails==true) {
      this.showDetails = false;
    } else {
      this.showDetails = true;
    }
  }

  getMIStatusData(id: number) {
    this.inspectionService.getMIStatusData(id);
  }
}
