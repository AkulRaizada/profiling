import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfilingComponent } from './profiling/profiling.component';
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditCriteriaProfilingComponent } from './add-edit-criteria-profiling/add-edit-criteria-profiling.component'
import { MatDialogModule } from '@angular/material/dialog';
import { AddEditCriteriaComponent } from './profiling/add-edit-criteria/add-edit-criteria.component';
import { ProfilingNewComponent } from './profiling-new/profiling-new.component';
import { TreeTableModule } from 'primeng/treetable';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AgGridModule } from 'ag-grid-angular';
import { ProfilingGridComponent } from './profiling-grid/profiling-grid.component';
import 'ag-grid-enterprise';
import { HttpClientModule } from '@angular/common/http';
import {MultiSelectModule} from 'primeng/multiselect';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfilingComponent,
    AddEditCriteriaProfilingComponent,
    AddEditCriteriaComponent,
    ProfilingNewComponent,
    ProfilingGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    DropdownModule,
    MatDialogModule,
    TreeTableModule,
    ToastModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    MenubarModule,
    AgGridModule,
    HttpClientModule,
    MultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
