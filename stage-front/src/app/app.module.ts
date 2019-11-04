import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule, MatCardModule, MatButtonModule,
        MatToolbarModule, MatExpansionModule, MatSidenavModule, MatTabsModule,
        MatFormFieldModule, MatTableModule, MatSortModule, MatStepperModule,
        MatSelectModule, MatDatepickerModule, MatNativeDateModule,
        MatGridListModule} from '@angular/material';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostConService } from './services/con.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { SideCompComponent } from './side-comp/side-comp.component';
import { ComptesComponent } from './comptes/comptes.component';
import {CompteService } from './services/comptes.services';
import { CompteTableComponent } from './compte-table/compte-table.component';
import { AjouterCompteComponent } from './ajouter-compte/ajouter-compte.component';
import { EcrituresComponent } from './ecritures/ecritures.component';
import { EcritureService } from './services/ecriture.service';
import { EcritureTableComponent } from './ecriture-table/ecriture-table.component';
import { AjouterEcritureComponent } from './ajouter-ecriture/ajouter-ecriture.component';
import { TableauPeriodeComponent } from './tableau-periode/tableau-periode.component';
import { EcCoComponent } from './ec-co/ec-co.component';
import { EcCoTableComponent } from './ec-co-table/ec-co-table.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ToolbarComponent,
    PostListComponent,
    SideCompComponent,
    ComptesComponent,
    CompteTableComponent,
    AjouterCompteComponent,
    EcrituresComponent,
    EcritureTableComponent,
    AjouterEcritureComponent,
    TableauPeriodeComponent,
    EcCoComponent,
    EcCoTableComponent,
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatSortModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    DataTablesModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatStepperModule,
    HttpClientModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule
  ],
  providers: [PostConService, HttpClient, CompteService, EcritureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
