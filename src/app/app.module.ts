import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { InspectionDetailsComponent } from './final-inspection/inspection-details/inspection-details.component';
import { InspectionListComponent } from './final-inspection/inspection-list/inspection-list.component';
import { InspectionViewComponent } from './final-inspection/inspection-view.component';


@NgModule({
  declarations: [
    AppComponent,
    InspectionDetailsComponent,
    InspectionListComponent,
    InspectionViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
