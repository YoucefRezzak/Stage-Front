import { Component, OnInit, Input } from '@angular/core';
import {CompteService} from '../../services/comptes.services';
import {EcritureService} from '../../services/ecriture.service';
import {Compte} from '../../compte.model';
import {Ecriture} from '../../ecriture.model';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-ec-co-table',
  templateUrl: './ec-co-table.component.html',
  styleUrls: ['./ec-co-table.component.css']
})
export class EcCoTableComponent implements OnInit {
  pipe = new DatePipe('en-US'); // Use your own locale
  ELEMENT_DATA: info [] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = ['Ecriture', 'Compte', 'Somme', 'Motif', 'Date'];
  compteMat = 0;
  whatIsThis = '';
  @Input() recu: boolean;
  @Input() compte: Compte;
  constructor(private compteService: CompteService, private ecritureService: EcritureService) { }

  ngOnInit() {
    if (this.recu) {
      this.whatIsThis = 'Les Credits : ';
    } else {
      this.whatIsThis = 'Les Depenses : ';
    }
    this.getinfo();
  }
  getinfo() {
    if (this.recu) {
      this.ecritureService.getEcritures().subscribe(ecritures => {
        ecritures.forEach(element => {
          if (element.compteVMat === this.compte.mat) {
            const inf = { num: element.num,
              date: this.pipe.transform(element.date, 'yyyy-MM-dd'),
              mat: element.compteSmat,
              motif: element.motif,
              somme: element.somme
            };
            this.ELEMENT_DATA.push(inf);
          }
        });
        this.dataSource.data = this.ELEMENT_DATA;
      });
    } else {
      this.ecritureService.getEcritures().subscribe(ecritures => {
        ecritures.forEach(element => {
          if (element.compteSmat === this.compte.mat) {
            const inf = { num: element.num,
              date: this.pipe.transform(element.date, 'yyyy-MM-dd'),
              mat: element.compteVMat,
              motif: element.motif,
              somme: element.somme
            };
            this.ELEMENT_DATA.push(inf);
          }
        });
        this.dataSource.data = this.ELEMENT_DATA;
      });
    }
  }
  getTotal(): number {
    let s = 0;
    this.ELEMENT_DATA.forEach(element => {
      s += element.somme;
    });
    return s;
  }

}
// tslint:disable-next-line: class-name
interface info {
  num: number;
  date: string;
  mat: number;
  motif: string;
  somme: number;
}
