import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Classe} from '../../classe.model';
import { ClasseService } from '../../services/classes.service';

@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.css']
})
export class ClassTableComponent implements OnInit {
  public ELEMENT_DATA: Classe[] = [];
  displayedColumns: string[] = [ 'Num', 'Nom', 'Somme', 'Modifier' ] ;
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private classService: ClasseService) {}

  ngOnInit() {
    this.getClasses();
    this.dataSource.sort = this.sort;
    this.classService.messageCompte$.subscribe(compte => {
      this.ELEMENT_DATA.push(compte);
      this.dataSource.data = this.ELEMENT_DATA;
      this.dataSource.sort = this.sort;
    });
    this.classService.updatCompte$.subscribe(compte => {
      this.ELEMENT_DATA.forEach(element => {
        if (element.num === compte.num) {
          element.nom = compte.nom;
          element.somme = compte.somme;
        }
      });
    });
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getClasses() {
    this.classService.getClasses().subscribe( (res) => {
      this.ELEMENT_DATA = res;
      this.dataSource.data = this.ELEMENT_DATA;
      this.dataSource.sort = this.sort;
      return ;
    });
    return;
  }
  modifier(classe: Classe) {
    this.classService.modifier(classe);
    console.log('changer tab! ');
  }
  getTotal(): number {
    let  t = 0;
    this.ELEMENT_DATA.forEach(element => {
        // tslint:disable-next-line: radix
        t += parseInt(element.somme + '');
    });
    return t;
  }
}
