import { Component, OnInit } from '@angular/core';
import {InspectorService } from '../shared/inspector.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  onSubmit(form: NgForm) {
    var id = this.inspectorService.selectedInspector.Id;
    var inspection = this.inspectorService.selectedInspector;
    console.log(id + " " + inspection);
    if (id == null) {
      console.log("Id = null. " + form.value);
      this.inspectorService.postInspector(form.value)
        .subscribe(data => {
          //this.resetForm(form);          
          this.toastr.success('Inspector added successfully!', 'Manage Inspectors');
          console.log(data);
          this.inspectorService.getData("Inspector", "GetInspectors");
        })
    } 
    else {
      if (confirm('Are you sure you want to modify this record?') == true) {
        console.log(form.value);
        this.inspectorService.putInspector(form.value)
          .subscribe(data => {
            //this.resetForm(form);
            this.toastr.info('Inspector updated successfully!', 'Manage Inspectors');
            this.inspectorService.getData("Inspector", "GetInspectors");
          })
      } else {
        //this.resetForm(form);
      }
    }
  }
}