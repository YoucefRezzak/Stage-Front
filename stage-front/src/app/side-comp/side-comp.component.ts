import { Component, OnInit } from '@angular/core';
import {CompteService } from '../services/comptes.services';
import {EcritureService } from '../services/ecriture.service';

@Component({
  selector: 'app-side-comp',
  templateUrl: './side-comp.component.html',
  styleUrls: ['./side-comp.component.css']
})
export class SideCompComponent implements OnInit {
  showFiller = false;
  constructor(private compteService: CompteService, private ecritureService: EcritureService) { }
  ngOnInit() {
  }
  ouvComptes() {
    const i = this.compteService.showComptes();
    this.showFiller = false;
  }
  ouvEcritures() {
    this.ecritureService.showE();
    this.showFiller = false;
  }
  ouvMouv() {
    this.compteService.showMouv();
    this.showFiller = false;
  }
  ouvEcComp() {
    this.ecritureService.showEC();
    this.showFiller = false;
  }
}
