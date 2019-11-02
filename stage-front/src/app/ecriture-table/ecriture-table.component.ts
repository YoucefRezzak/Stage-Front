import { Component, OnInit } from '@angular/core';
import { EcritureService } from '../services/ecriture.service';
import { Ecriture } from '../ecriture.model';
import { Subscription } from 'rxjs';
import { CompteService } from '../services/comptes.services';
import { Compte } from '../compte.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ecriture-table',
  templateUrl: './ecriture-table.component.html',
  styleUrls: ['./ecriture-table.component.css'],
})
export class EcritureTableComponent implements OnInit {
  pipe = new DatePipe('en-US'); // Use your own locale
  constructor( private ecritureService: EcritureService, private compteService: CompteService) {}
  public ELEMENT_DATA: Ecriture[] = [];
  public comptes: Compte[] = [];
  private ecritureSub: Subscription;
  public result = '';
  // tslint:disable-next-line: ban-types
  isExpansionDetailRow = (i: number, row: Object) => {
    return row.hasOwnProperty('detailRow');
  }

  ngOnInit() {
    this.getListComptes();

    this.ecritureService.insertEc$.subscribe(ecriture => {
        this.ELEMENT_DATA.push(ecriture);
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
          date: element.date,
          text : this.toString(element)});
      });
      this.ELEMENT_DATA = rows;
    });
  }
  toString(ecriture: Ecriture): string {
    const text = 'Compte envoyant : ' + this.getCompte(ecriture.compteSmat)
                  + '<br/>\nCompte recevant : ' + this.getCompte(ecriture.compteVMat)
                  + '<br/>\nSomme : ' + ecriture.somme
                  + '<br/>\nDate : ' +  this.pipe.transform(ecriture.date, 'yyyy-MM-dd');
    return text;
  }
  getCompte(mat: number): string {
    let a = 'aaaa';
    this.comptes.forEach(element => {
      if (element.mat === mat) {
        a = element.nom;
      }
    });
    return a;
  }

  modifier(ecriture: Ecriture) {

  }
}
