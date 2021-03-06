import { Component, OnInit, ViewChild } from '@angular/core';
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
  // Upload Variables
  filesToUpload: Array<File>;
  selectedFileNames: string[] = [];
  res: Array<string>;
  @ViewChild('fileUpload') fileUploadVar: any;

  showDetails: boolean = true;
  constructor(private inspectionService: FinalInspectionService, private toastr: ToastrService) {
    this.inspectionService.uploadErrorMessage = "";
    this.filesToUpload = [];
    this.selectedFileNames = [];
    this.inspectionService.uploadResult = "";
  }

  fileChangeEvent(fileInput: any) {
    //Clear Uploaded Files result message
    this.inspectionService.uploadResult = "";
    this.filesToUpload = <Array<File>>fileInput.target.files;

    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.selectedFileNames.push(this.filesToUpload[i].name);
    }
  }

  cancelUpload() {
    this.filesToUpload = [];
    this.fileUploadVar.nativeElement.value = "";
    this.selectedFileNames = [];
    this.inspectionService.uploadResult = "";
    this.inspectionService.uploadErrorMessage = "";
    if (confirm('Are you sure you want to remove these files?') == true) {
      this.inspectionService.uploadedFileNames = [];
      this.inspectionService.selectedInspection.FinalInspectionUploads = [];
    }
  }

  beginUpload() {
    if (this.filesToUpload.length == 0) {
      alert('Please select at least 1 PDF files to upload!');
    }
    else if (this.filesToUpload.length > 5) {
      alert('Please select a maximum of 5 PDF files to upload!');
    }
    else {
      if (this.validatePDFSelectedOnly(this.selectedFileNames)) {
        this.inspectionService.uploadFiles(this.filesToUpload, this.selectedFileNames);
        this.fileUploadVar.nativeElement.value = "";
        this.selectedFileNames = [];
      }
    }
  }


  validatePDFSelectedOnly(filesSelected: string[]) {
    for (var i = 0; i < filesSelected.length; i++) {
      if (filesSelected[i].slice(-3).toUpperCase() != "PDF") {
        alert('Please select PDF files only!');
        return false;
      }
      else {
        return true;
      }
    }
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.inspectionService.selectedInspection = {
      Id: null,
      TMSPartNumber: '',
      MiStatusBarcode: '',
      QuantityInspected: '',
      QuantityAccepted: '',
      InspectionType: '',
      MfgLocation: '',
      InspectionLocation: '',
      InspectorName: '',
      EmployeeId: '',
      DateInspected: '',
      FinalInspectionUploads: [],
      MiStatus: {
        Id: null,
        SalesOrder: '',
        MINumber: '',
        MIRev: '',
        Location: '',
        CustomerName: ''
      },
      Assembly: null
    }
    this.inspectionService.MIStatusData = {
      Id: null,
      SalesOrder: '',
      MINumber: '',
      MIRev: '',
      Location: '',
      CustomerName: '',
    }
    this.inspectionService.MiDetails = false;
    this.inspectionService.uploadedFileNames = [];
    this.refreshData();
  }

  onSubmit(form: NgForm) {
    var id = this.inspectionService.selectedInspection.Id;
    var inspection = this.inspectionService.selectedInspection;
    if (inspection != null) {
      if (id == null) {
        this.inspectionService.postInspection(inspection)
          .subscribe(data => {
            this.resetForm(form);
            this.toastr.success('New Record added successfully!', 'Final Inspection');
            this.refreshData();
            this.inspectionService.uploadedFileNames = [];
          })
      } else {
        if (confirm('Are you sure you want to modify this record?') == true) {
          this.inspectionService.putInspection(inspection)
            .subscribe(data => {
              this.resetForm(form);
              this.toastr.info('Record updated successfully!', 'Final Inspection');
              this.refreshData();
              this.inspectionService.uploadedFileNames = [];
            })
        } else {
          this.resetForm(form);
        }
      }
    }

  }

  refreshData() {
    this.inspectionService.getData("FinalInspection", "GetInspections");
  }

  toggleDetails() {
    if (this.showDetails == true) {
      this.showDetails = false;
    } else {
      this.showDetails = true;
    }
  }

  getMIStatusData(id: string) {
    this.resetForm();
    this.inspectionService.getMIStatusData(id);
  }

  removeAttachment(fileName?: string) {
    var uploads = this.inspectionService.selectedInspection.FinalInspectionUploads;
    uploads.forEach((item, index) => {
      if (item.Attachment === fileName) uploads.splice(index, 1);
    });
  }

  downloadAttachment(id?: number) {
    document.location.href = '/api/finalinspection/downloadfiles/' + id;
  }
}
