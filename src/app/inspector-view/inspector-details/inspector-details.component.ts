import { Component, OnInit } from '@angular/core';
import { InspectorService } from '../shared/inspector.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inspector-details',
  templateUrl: './inspector-details.component.html',
  styleUrls: ['./inspector-details.component.css']
})

export class InspectorDetailsComponent implements OnInit {
  showDetails: boolean = false;
  constructor(private inspectorService: InspectorService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  toggleDetails() {
    if (this.showDetails == true) {
      this.showDetails = false;
    } else {
      this.showDetails = true;
    }
  }

  resetForm(form?: NgForm) {
    if (form!=null)
      form.reset();
    this.inspectorService.selectedInspector = {
      Id: null,
      FirstName: '',
      LastName: '',
      Location: '',
      EmployeeId: ''
    }
  }

  onSubmit(form: NgForm) {
    
    if (this.inspectorService.selectedInspector.Id !== null){
      var id = this.inspectorService.selectedInspector.Id;
    } else {
      id = null;
    }
    var inspector = this.inspectorService.selectedInspector;
    console.log(id + " " + inspector);
    if (id == null) {
      console.log("Id = null. " + form.value);
      this.inspectorService.postInspector(form.value)
        .subscribe(data => {
          this.resetForm(form);          
          this.toastr.success('Inspector added successfully!', 'Manage Inspectors');
          console.log(data);
          this.inspectorService.getData();
        })
    }
    else {
      if (confirm('Are you sure you want to modify this record?') == true) {
        console.log(form.value);
        this.inspectorService.putInspector(form.value)
          .subscribe(data => {
            this.resetForm(form);
            this.toastr.info('Inspector updated successfully!', 'Manage Inspectors');
            this.inspectorService.getData();
          })
      } else {
        //this.resetForm(form);
      }
    }
  }
}
