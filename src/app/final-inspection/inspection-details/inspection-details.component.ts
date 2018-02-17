import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FinalInspectionService } from '../shared/final-inspection.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: ['./inspection-details.component.css']
})
export class InspectionDetailsComponent implements OnInit {
  show: boolean = true;
  constructor(private inspectionService: FinalInspectionService) { }

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
      InspectorId: '',
      DateInspected: ''
    }
  }

  onSubmit(form: NgForm) {
    alert(this.inspectionService.selectedInspection.TMSPartNumber);
  }

  toggleForm() {
    if (this.show==true) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
}
