import { Component, OnInit } from '@angular/core';
import { FinalInspectionService } from './shared/final-inspection.service';

@Component({
  selector: 'app-inspection-view',
  templateUrl: './inspection-view.component.html',
  styleUrls: ['./inspection-view.component.css'],
  providers: [FinalInspectionService]
})
export class InspectionViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
