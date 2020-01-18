import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import {CompteService} from '../services/comptes.services';
import {EcritureService} from '../services/ecriture.service';
import {Compte} from '../compte.model';
import {Ecriture} from '../ecriture.model';

@Component({
  selector: 'app-tableau-periode',
  templateUrl: './tableau-periode.component.html',
  styleUrls: ['./tableau-periode.component.css']
})
export class TableauPeriodeComponent implements OnInit {

  displayedColumns: string[] = ['Compte',
  'Depenses Debut', 'Crédits Debut', 'Depenses', 'Crédits', 'Solde fin de periode'];
  public ELEMENT_DATA: any[] = [];
  comptes: Compte [] = [];
  ecritures: Ecriture [] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  infos: info [] = [];
  dateDebut: Date = new Date('0001-01-01');
  dateFin: Date = new Date('9999-12-31');
  allTime = true;
  show = true;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateDebut = event.value;
    this.allTime = false;
    if (this.dateFin !== null) {
      this.getInfo();
    }
  }
  addEventF(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateFin = event.value;
    this.allTime = false;
    if (this.dateDebut !== null) {
      this.getInfo();
    }
    this.getInfo();
  }
  constructor(private compteService: CompteService, private ecritureService: EcritureService) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.getInfo();
    this.compteService.showMou$.subscribe(() => {
      this.show = !this.show;
    });
  }
  getInfo() {
    this.ecritureService.getEcritures().subscribe(res => {
      this.ecritures = [];
      this.ecritures = res;
      this.compteService.getComptes().subscribe(ress => {
        this.comptes = [];
        this.comptes = ress;
        this.remplireInfo();
      });
    });
  }
  remplireInfo() {
    this.infos = [];
    this.comptes.forEach(compte => {
      // tslint:disable-next-line: prefer-const
      let inf: info = {Mat: compte.mat, depD: 0, dep: 0, cre: 0, creD: compte.soldein, solde: 0};
      this.ecritures.forEach(ecriture => {
        // credit
        if ( compte.mat === ecriture.compteVMat ) {
          // credit debut :
          if (new Date(ecriture.date).getTime() < this.dateDebut.getTime()) {
            inf.creD += ecriture.somme;
          }
          if (this.allTime) {
            inf.creD = compte.soldein;
          }
          // mouvement credit:
          if ((new Date(ecriture.date).getTime() >= this.dateDebut.getTime() &&
              new Date(ecriture.date).getTime() < this.dateFin.getTime())
              || this.allTime) {
            inf.cre += ecriture.somme;
          }
        }
        // depenses!
        if (compte.mat === ecriture.compteSmat) {
          // credit debut :
          if (new Date(ecriture.date).getTime() < this.dateDebut.getTime()) {
            inf.creD -= ecriture.somme;
          }
          // mouvement et fin :
          if ((new Date(ecriture.date).getTime() >= this.dateDebut.getTime() && new Date(ecriture.date).getTime() < this.dateFin.getTime())
               || this.allTime) {
            inf.dep += ecriture.somme;
          }
        }
      });
      inf.solde = inf.cre - inf.dep + inf.creD;
      this.infos.push(inf);
    });
    this.ELEMENT_DATA = this.infos;
    this.dataSource.data = this.ELEMENT_DATA;
  }
  getTotalcreD(): number {
    let s = 0;
    this.dataSource.data.forEach(element => {
      s += element.creD;
    });
    return s;
  }
  getTotalcre(): number {
    let s = 0;
    this.dataSource.data.forEach(element => {
      s += element.cre;
    });
    return s;
  }
  getTotaldepD(): number {
    let s = 0;
    this.dataSource.data.forEach(element => {
      s += element.depD;
    });
    return s;
  }
  getTotaldep(): number {
    let s = 0;
    this.dataSource.data.forEach(element => {
      s += element.dep;
    });
    return s;
  }
  getTotalSol(): number {
    let s = 0;
    this.dataSource.data.forEach(element => {
      s += element.solde;
    });
    return s;
  }
}

// tslint:disable-next-line: class-name
interface info {
  Mat: number;
  depD: number;
  creD: number;
  dep: number;
  cre: number;
  solde: number;
}
