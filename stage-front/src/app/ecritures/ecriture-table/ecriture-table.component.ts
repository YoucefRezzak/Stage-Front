import { Component, OnInit } from '@angular/core';
import { EcritureService } from '../../services/ecriture.service';
import { Ecriture } from '../../ecriture.model';
import { Subscription } from 'rxjs';
import { CompteService } from '../../services/comptes.services';
import { Compte } from '../../compte.model';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-ecriture-table',
  templateUrl: './ecriture-table.component.html',
  styleUrls: ['./ecriture-table.component.css'],
})
export class EcritureTableComponent implements OnInit {
  pipe = new DatePipe('en-US'); // Use your own locale
  constructor( private ecritureService: EcritureService, private compteService: CompteService) {}
  public comptes: Compte[] = [];
  private ecritureSub: Subscription;
  public result = '';
  displayedColumns: string[] = ['Num', 'Date', 'Compte Envoyant', 'Compte Recevant', 'Somme', 'Motif', 'Supprimer'];
  public ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  // tslint:disable-next-line: ban-types
  isExpansionDetailRow = (i: number, row: Object) => {
    return row.hasOwnProperty('detailRow');
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.getListComptes();

    this.ecritureService.insertEc$.subscribe(element => {
      const row = {num : element.num,
          somme: element.somme,
          matS: element.compteSmat,
          matV: element.compteVMat,
          motif: element.motif,
          date: this.pipe.transform(element.date, 'yyyy-MM-dd'),
          nomS: this.getCompte(element.compteSmat),
          nomV: this.getCompte(element.compteVMat)
        };
      this.ELEMENT_DATA.push(row);
      this.dataSource.data = this.ELEMENT_DATA;
      this.dataSource.data.sort((a, b) => (a.num > b.num) ? 1 : -1);
    });
  }
  getListComptes() {
    this.compteService.getComptes().subscribe(result => {
      this.comptes = result;
      this.getList();
    });
  }
  getList() {
    this.ecritureService.getEcritures().subscribe(res => {
      this.ELEMENT_DATA = res;
      const rows = [];
      this.ELEMENT_DATA.forEach(element => {
        rows.push({num : element.num,
          somme: element.somme,
          matS: element.compteSmat,
          matV: element.compteVMat,
          motif: element.motif,
          date: this.pipe.transform(element.date, 'yyyy-MM-dd'),
          nomS: this.getCompte(element.compteSmat),
          nomV: this.getCompte(element.compteVMat)
        });
      });
      this.ELEMENT_DATA = rows;
      this.dataSource.data = rows;
      this.dataSource.data.sort((a, b) => (a.num > b.num) ? 1 : -1);
    });
  }
  toString(ecriture: Ecriture): string {
    const text = 'Compte envoyant : ' + ecriture.compteSmat + ' ' + this.getCompte(ecriture.compteSmat)
                  + '<br/>\nCompte recevant : ' + ecriture.compteVMat + ' ' + this.getCompte(ecriture.compteVMat)
                  + '<br/>\nSomme : ' + ecriture.somme
                  + '<br/>\nMotif : ' + ecriture.motif
                  + '<br/>\nDate : ' +  this.pipe.transform(ecriture.date, 'yyyy-MM-dd');
    return text;
  }
  getCompte(mat: number): string {
    let a = 'aaaa';
    this.comptes.forEach(element => {
      if (element.mat === mat) {
        a = element.mat + ' ' + element.nom ;
      }
    });
    return a;
  }
  getTotal(): number {
    let a = 0;
    this.ELEMENT_DATA.forEach(element => {
      a += element.somme;
    });
    return a;
  }

  supprimer(ecriture: Ecriture) {

  }
}
