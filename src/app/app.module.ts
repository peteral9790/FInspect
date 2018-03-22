import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FinspectErrorService } from './Common/finspect-error.service';
import { FInspectErrorHandler } from './Common/finspect-error-handler';

import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { InspectionDetailsComponent } from './final-inspection/inspection-details/inspection-details.component';
import { InspectionListComponent } from './final-inspection/inspection-list/inspection-list.component';
import { InspectionViewComponent } from './final-inspection/inspection-view.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { NonconformanceViewComponent } from './Nonconformance/nonconformance-view.component';
import { InspectorViewComponent } from './inspector-view/inspector-view.component';
import { InspectorListComponent } from './inspector-view/inspector-list/inspector-list.component';
import { InspectorDetailsComponent } from './inspector-view/inspector-details/inspector-details.component';

const appRoutes: Routes = [
  { path: 'Nonconformance', component: NonconformanceViewComponent },
  { path: 'FinalInspection', component: InspectionViewComponent },
  { path: 'Inspectors', component: InspectorViewComponent },
  { path: '', redirectTo: '/FinalInspection', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    InspectionDetailsComponent,
    InspectionListComponent,
    InspectionViewComponent,
    NotFoundComponent,
    NonconformanceViewComponent,
    InspectorViewComponent,
    InspectorListComponent,
    InspectorDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [
    FInspectErrorHandler,
    FinspectErrorService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
