import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Compte} from '../../compte.model';
import { CompteService } from '../../services/comptes.services';

@Component({
  selector: 'app-compte-table',
  templateUrl: './compte-table.component.html',
  styleUrls: ['./compte-table.component.css']
})
export class CompteTableComponent implements OnInit {
  public ELEMENT_DATA: Compte[] = [];
  displayedColumns: string[] = [ 'Classe', 'Matricule', 'Nom', 'Somme', 'Solde initial', 'Modifier' ] ;
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private compteService: CompteService) {}

  ngOnInit() {
    this.getComptes();
    this.compteService.messageCompte$.subscribe(compte => {
      this.ELEMENT_DATA.push(compte);
      this.dataSource.data = this.ELEMENT_DATA;
      this.dataSource.sort = this.sort;
    });
    this.compteService.updatCompte$.subscribe(compte => {
      this.ELEMENT_DATA.forEach(element => {
        if (element.mat === compte.mat) {
          element.nom = compte.nom;
          element.somme = compte.somme;
          element.classe = compte.classe;
        }
      });
    });
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getComptes() {
    this.compteService.getComptes().subscribe( (res) => {
      this.ELEMENT_DATA = res;
      this.dataSource.data = this.ELEMENT_DATA;
      this.dataSource.sort = this.sort;
      return ;
    });
    return;
  }
  modifier(compte: Compte) {
    this.compteService.modifier(compte);
  }
  getTotal(): number {
    let  t = 0;
    this.ELEMENT_DATA.forEach(element => {
        // tslint:disable-next-line: radix
        t += parseInt(element.somme + '');
    });
    return t;
  }
  getTotalin(): number {
    let  t = 0;
    this.ELEMENT_DATA.forEach(element => {
        // tslint:disable-next-line: radix
        t += parseInt(element.soldein + '');
    });
    return t;
  }
}




